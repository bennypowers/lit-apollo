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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const logging = require("plylog");
const logger = logging.getLogger('cli.build.load-config');
function loadServiceWorkerConfig(configFile) {
    return new Promise((resolve, _reject) => {
        fs.stat(configFile, (statError) => {
            let config = null;
            // only log if the config file exists at all
            if (!statError) {
                try {
                    config = require(configFile);
                }
                catch (loadError) {
                    logger.warn(`${configFile} file was found but could not be loaded`, { loadError });
                }
            }
            resolve(config);
        });
    });
}
exports.loadServiceWorkerConfig = loadServiceWorkerConfig;
//# sourceMappingURL=load-config.js.map