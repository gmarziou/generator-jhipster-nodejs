/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const jhipsterUtils = require('generator-jhipster/generators/utils');
const constants = require('./generator-nodejs-constants');

module.exports = {
    addEntityToAppModuleImport,
    addEntityToAppModule,
    addControllerToAppModuleImport,
    addControllerToAppModule
};

// NEED TO TEST

function addEntityToAppModuleImport(generator, entityClass, entityFileName) {
    jhipsterUtils.rewriteFile(
        {
            file: `${constants.SERVER_NODEJS_SRC_DIR}/src/app.module.ts`,
            needle: 'jhipster-needle-add-entity-module-to-main-import',
            splicable: [`import { ${entityClass}Module } from './module/${entityFileName}.module';`]
        },
        generator
    );
}

function addEntityToAppModule(generator, entityClass) {
    jhipsterUtils.rewriteFile(
        {
            file: `${constants.SERVER_NODEJS_SRC_DIR}/src/app.module.ts`,
            needle: 'jhipster-needle-add-entity-module-to-main',
            splicable: [`${entityClass}Module,`]
        },
        generator
    );
}

function addControllerToAppModuleImport(generator, controllerClass, controllerFileName) {
    jhipsterUtils.rewriteFile(
        {
            file: `${constants.SERVER_NODEJS_SRC_DIR}/src/app.module.ts`,
            needle: 'jhipster-needle-add-controller-module-to-main-import',
            splicable: [`import { ${controllerClass}Controller } from './web/rest/${controllerFileName}.controller';`]
        },
        generator
    );
}

function addControllerToAppModule(generator, controllerClass) {
    jhipsterUtils.rewriteFile(
        {
            file: `${constants.SERVER_NODEJS_SRC_DIR}/src/app.module.ts`,
            needle: 'jhipster-needle-add-controller-module-to-main',
            splicable: [`${controllerClass}Controller,`]
        },
        generator
    );
}
