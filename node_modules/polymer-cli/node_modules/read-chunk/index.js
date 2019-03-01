'use strict';
const fs = require('fs');
const pify = require('pify');
const withOpenFile = require('with-open-file');

const fsReadP = pify(fs.read, {multiArgs: true});

module.exports = (filePath, position, length) => {
	const buffer = Buffer.alloc(length);

	return withOpenFile(filePath, 'r', fileDescriptor =>
		fsReadP(fileDescriptor, buffer, 0, length, position)
	)
		.then(([bytesRead, buffer]) => {
			if (bytesRead < length) {
				buffer = buffer.slice(0, bytesRead);
			}

			return buffer;
		});
};

module.exports.sync = (filePath, position, length) => {
	let buffer = Buffer.alloc(length);

	const bytesRead = withOpenFile.sync(filePath, 'r', fileDescriptor =>
		fs.readSync(fileDescriptor, buffer, 0, length, position)
	);

	if (bytesRead < length) {
		buffer = buffer.slice(0, bytesRead);
	}

	return buffer;
};
