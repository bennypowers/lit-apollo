"use strict";
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Be careful with these imports. As many as possible should be dynamic imports
// in the run method in order to minimize startup time from loading unused code.
const logging = require("plylog");
const args_1 = require("polyserve/lib/args");
const logger = logging.getLogger('cli.command.serve');
class ServeCommand {
    constructor() {
        this.name = 'serve';
        this.aliases = [];
        this.description = 'Runs the polyserve development server';
        this.args = args_1.args;
    }
    run(options, config) {
        return __awaiter(this, void 0, void 0, function* () {
            // Defer dependency loading until this specific command is run
            const polyserve = yield Promise.resolve().then(() => require('polyserve'));
            const startServers = polyserve.startServers;
            const getServerUrls = polyserve.getServerUrls;
            const url = yield Promise.resolve().then(() => require('url'));
            let openPath;
            if (config.entrypoint && config.shell) {
                openPath = config.entrypoint.substring(config.root.length);
                if (openPath === 'index.html' || openPath === '/index.html') {
                    openPath = '/';
                }
            }
            // TODO(justinfagnani): Consolidate args handling between polymer-cli and
            // polyserve's CLI.
            const proxyArgs = {
                path: options['proxy-path'],
                target: options['proxy-target']
            };
            const serverOptions = {
                root: options['root'],
                entrypoint: config.entrypoint,
                compile: options['compile'],
                port: options['port'],
                hostname: options['hostname'],
                open: options['open'],
                browser: options['browser'],
                openPath: options['open-path'],
                npm: config.npm,
                moduleResolution: config.moduleResolution,
                componentDir: config.componentDir,
                packageName: options['package-name'],
                protocol: options['protocol'],
                keyPath: options['key'],
                certPath: options['cert'],
                pushManifestPath: options['manifest'],
                proxy: proxyArgs.path && proxyArgs.target && proxyArgs,
            };
            logger.debug('serving with options', serverOptions);
            const env = options['env'];
            if (env && env.serve) {
                logger.debug('env.serve() found in options');
                logger.debug('serving via env.serve()...');
                return env.serve(serverOptions);
            }
            logger.debug('serving via polyserve.startServers()...');
            const serverInfos = yield startServers(serverOptions);
            if (serverInfos.kind === 'mainline') {
                const mainlineServer = serverInfos;
                const urls = getServerUrls(options, mainlineServer.server);
                logger.info(`Files in this directory are available under the following URLs
      applications: ${url.format(urls.serverUrl)}
      reusable components: ${url.format(urls.componentUrl)}
    `);
            }
            else {
                // We started multiple servers, just tell the user about the control
                // server, it serves out human-readable info on how to access the others.
                const urls = getServerUrls(options, serverInfos.control.server);
                logger.info(`Started multiple servers with different variants:
      View the Polyserve console here: ${url.format(urls.serverUrl)}`);
            }
        });
    }
}
exports.ServeCommand = ServeCommand;
//# sourceMappingURL=serve.js.map