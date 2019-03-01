'use strict';

var fs = require('fs'),
	path = require('path'),
	home = require('user-home'),

	fsReadFileSync = fs.readFileSync,
	fsStatSync = fs.statSync,
	pathJoin = path.join,
	pathResolve = path.resolve,

	DEFAULT_DIR = '.config',
	DEFAULT_ENC = 'utf8',
	LEADING_DOT = /^\./,
	PATH_SEP = path.sep;

// Does X/file.ext exist?
// Else, throw
function resolveFile(cwd, dir, filename) {
	dir = pathJoin(cwd, dir);

	var filepath = pathJoin(dir, filename),
		stat = fsStatSync(filepath);

	return stat && {
		cwd: cwd,
		dir: dir,
		path: filepath
	};
}

// Does X/file.ext exist?
// Does X/file.ext.js exist?
// Does X/file.ext/index.js exist?
// Else, throw
function resolveModule(cwd, dir, filename) {
	dir = pathJoin(cwd, dir);

	var filepath = pathJoin(dir, filename),
		resolved = require.resolve(filepath);

	return resolved && {
		cwd: cwd,
		dir: dir,
		path: resolved
	};
}

/**
 * Finds the first matching config file, if any, in the current directory,
 * nearest ancestor, or user's home directory. Supports finding files within a
 * subdirectory of an ancestor directory. Configurable with defaults set to
 * support the [XDG Base Directory Specification][xdg] for configuration files.
 *
 * [xdg]: http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html
 *
 * @type {Function}
 * @param {String} filename
 * @param {Object=} options
 * @param {String=} options.cwd Directory in which to start looking. (Default: `process.cwd()`)
 * @param {String=} options.dir An optional subdirectory to check at each level. (Default: `'.config'`)
 * @param {Boolean=} options.dot Whether to keep the leading dot in the filename in `dir`. (Default: `false`)
 * @param {Boolean=} options.home Whether to also check the user's home directory. (Default: `true`)
 * @param {Boolean=} options.module Whether to use Node.js module resolution. (Default: `false`)
 * @return {?String}
 */
function findConfig(filename, options) {
	var config = findConfig.obj(filename, options);

	return config && config.path;
}

/**
 * Finds first matching config file, if any and returns the matched directories
 * and config file path.
 *
 * @type {Function}
 * @param {String} filename
 * @param {Object} options Same as `findConfig` options.
 * @return {?Object}
 */
findConfig.obj = function (filename, options) {
	if (!filename) return null;

	options = options || {};

	var fileObj,

		// What subdir?
		dir = options.dir != null
			? options.dir
			: DEFAULT_DIR,

		// Keep leading dot in filename?
		dotless = options.dot
			? filename
			: filename.replace(LEADING_DOT, ''),

		// File or module?
		resolve = options.module
			? resolveModule
			: resolveFile,

		// Chunk path.
		cwd = pathResolve(options.cwd || '.').split(PATH_SEP),
		i = cwd.length;

	function test(x) {
		// Does X/file.ext exist?
		try { return resolve(x, '', filename); }
		catch (e) {}

		// Does X/.dir/file.ext exist?
		try { return resolve(x, dir, dotless); }
		catch (e) {}
	}

	// Walk up path.
	while (i--) {
		fileObj = test(cwd.join(PATH_SEP));

		// istanbul ignore next
		if (fileObj) return fileObj;

		// Change X to parent.
		cwd.pop();
	}

	// Check in home.
	if (options.home || options.home == null) {
		fileObj = test(home);

		// istanbul ignore next
		if (fileObj) return fileObj;
	}

	return null;
};

/**
 * Finds and reads the first matching config file, if any.
 *
 * @type {Function}
 * @param {String} filename
 * @param {Object} options Same as `findConfig` options.
 * @param {String} encoding Defaults to `'utf8'`.
 * @param {String} flag Defaults to `'r'`.
 * @return {?String}
 */
findConfig.read = function (filename, options) {
	if (!filename) return null;

	options = options || {};

	var filepath = findConfig(filename, options);

	return filepath && fsReadFileSync(filepath, {
		encoding: options.encoding || DEFAULT_ENC,
		flag: options.flag
	});
};

/**
 * Finds and requires the first matching config file, if any. Implies `module` is `true`.
 *
 * @type {Function}
 * @param {String} filename
 * @param {Object} options Same as `findConfig` options.
 * @return {?String}
 */
findConfig.require = function (filename, options) {
	if (!filename) return null;

	options = options || {};
	options.module = true;

	var filepath = findConfig(filename, options);

	return filepath && require(filepath);
};

module.exports = findConfig;
