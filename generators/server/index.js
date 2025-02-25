/* eslint-disable consistent-return */
const chalk = require('chalk');
const ServerGenerator = require('generator-jhipster/generators/server');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const os = require('os');
const jhipsterNodeConstants = require('../generator-nodejs-constants');
const packagejs = require('../../package.json');
const writeFiles = require('./files').writeFiles;
const prompts = require('./prompts');

module.exports = class extends ServerGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint nodejs')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupServerOptions(this, jhContext);
    }

    get initializing() {
        const initPhaseFromJHipster = super._initializing();
        const jhipsterInitNodePhaseSteps = {
            /* eslint-disable */
            displayNHipsterLogo() {
                this.log('\n');
                this.log(`${chalk.yellow(' ███╗   ██╗')}${chalk.green(' ██╗   ██╗ ████████╗ ███████╗   ██████╗ ████████╗ ████████╗ ███████╗')}`);
                this.log(`${chalk.yellow(' ████╗  ██║')}${chalk.green(' ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██╔═════╝ ██╔═══██╗')}`);
                this.log(`${chalk.yellow(' ██╔██╗ ██║')}${chalk.green(' ████████║    ██║    ███████╔╝ ╚█████╗     ██║    ██████╗   ███████╔╝')}`);
                this.log(`${chalk.yellow(' ██║╚██╗██║')}${chalk.green(' ██╔═══██║    ██║    ██╔════╝   ╚═══██╗    ██║    ██╔═══╝   ██╔══██║')}`);
                this.log(`${chalk.yellow(' ██║ ╚████║')}${chalk.green(' ██║   ██║ ████████╗ ██║       ██████╔╝    ██║    ████████╗ ██║  ╚██╗')}`);
                this.log(`${chalk.yellow(' ╚═╝  ╚═══╝')}${chalk.green(' ╚═╝   ╚═╝ ╚═══════╝ ╚═╝       ╚═════╝     ╚═╝    ╚═══════╝ ╚═╝   ╚═╝')}\n`);
                this.log(chalk.white.bold('                            https://www.jhipster.tech\n'));
                this.log(chalk.white('Welcome to NHipster (Jhipster NodeJS Official Blueprint) ') + chalk.yellow(`v${packagejs.version}`));
                this.log(chalk.white('This blueprint generates your backend in NodeJS with NestJS framework'));

                this.log(
                    chalk.green(
                        ' _______________________________________________________________________________________________________________\n'
                    )
                );
                this.log(
                    chalk.white(
                        `  For any questions or improvements refer to the stream lead at ${chalk.yellow('https://github.com/amanganiello90')}`
                    )
                );
                this.log(
                    chalk.white(
                        `  If you find NHipster useful, support and star the project at ${chalk.yellow(
                            'https://github.com/jhipster/generator-jhipster-nodejs'
                        )}`
                    )
                );
                this.log(
                    chalk.green(
                        ' _______________________________________________________________________________________________________________\n'
                    )
                );
            },

            setupNodeServerconsts() {

                this.packageName = jhipsterNodeConstants.PACKAGE_NAME_NODEJS;
                this.cacheProvider = jhipsterNodeConstants.CACHE_PROVIDER_NODEJS;
                this.enableHibernateCache = jhipsterNodeConstants.ENABLE_HIBERNATE_CACHE_NODEJS;
                this.websocket = jhipsterNodeConstants.WEB_SOCKET_NODEJS;
                this.databaseType = jhipsterNodeConstants.DATABASE_TYPE_NODEJS;
                this.devDatabaseType = jhipsterNodeConstants.DEV_DATABASE_TYPE_NODEJS;
                this.prodDatabaseType = jhipsterNodeConstants.PROD_DATABASE_TYPE_NODEJS;
                this.searchEngine = jhipsterNodeConstants.SEARCH_ENGINE_NODEJS;
                this.messageBroker = jhipsterNodeConstants.MESSAGE_BROKER_NODEJS;
                this.serviceDiscoveryType = jhipsterNodeConstants.SERVICE_DISCOVERY_TYPE_NODEJS;
                this.buildTool = jhipsterNodeConstants.BUILD_TOOL_NODEJS;
                this.enableSwaggerCodegen = jhipsterNodeConstants.ENABLE_SWAGGER_CODEGEN_NODEJS;
                this.authenticationType = jhipsterNodeConstants.AUTHENTICATION_TYPE_NODEJS;
                this.testFrameworks =[];

                const configuration = this.getAllJhipsterConfig(this, true);
                this.mongoProdDatabase = configuration.get('mongoProdDatabase');
            }

        };
        /* eslint-enable */
        return Object.assign(initPhaseFromJHipster, jhipsterInitNodePhaseSteps);

        //  return initPhaseFromJHipster;
    }

    get prompting() {
        //  The prompting phase is being overriden so that we can ask our own questions
        return {
            askForModuleName: prompts.askForModuleName,
            askForMainServerSideOpts: prompts.askForMainServerSideOpts,
            setSharedNodeConfigOptions() {
                this.configOptions.serverPort = this.serverPort;
                this.configOptions.baseName = this.baseName;
                this.configOptions.mongoProdDatabase = this.mongoProdDatabase;
                this.configOptions.packageName = this.packageName;
                this.configOptions.cacheProvider = this.cacheProvider;
                this.configOptions.enableHibernateCache = this.enableHibernateCache;
                this.configOptions.websocket = this.websocket;
                this.configOptions.databaseType = this.databaseType;
                this.configOptions.devDatabaseType = this.devDatabaseType;
                this.configOptions.prodDatabaseType = this.prodDatabaseType;
                this.configOptions.searchEngine = this.searchEngine;
                this.configOptions.messageBroker = this.messageBroker;
                this.configOptions.serviceDiscoveryType = this.serviceDiscoveryType;
                this.configOptions.buildTool = this.buildTool;
                this.configOptions.enableSwaggerCodegen = this.enableSwaggerCodegen;
                this.configOptions.authenticationType = this.authenticationType;
                this.configOptions.testFrameworks = this.testFrameworks;
                // Make dist dir available in templates
                this.BUILD_DIR = this.getBuildDirectoryForBuildTool(this.configOptions.buildTool);
                this.CLIENT_DIST_DIR =
                    this.getResourceBuildDirectoryForBuildTool(this.configOptions.buildTool) + jhipsterConstants.CLIENT_DIST_DIR;
            }
        };

        // If the prompts need to be overriden then use the code commented out above instead
        // return super._prompting();
    }

    get configuring() {
        const confPhaseFromJHipster = super._configuring();
        const jhipsterConfigNodeSteps = {
            jhipsterNodeSaveConfig() {
                const config = {
                    mongoProdDatabase: this.mongoProdDatabase,
                    testFrameworks: this.testFrameworks
                };
                this.config.set(config);
            }
        };
        return Object.assign(confPhaseFromJHipster, jhipsterConfigNodeSteps);

        // Here we are not overriding this phase and hence its being handled by JHipster
        // return confPhaseFromJHipster;
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // The writing phase is being overriden so that we can write our own templates as well.
        return writeFiles();
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._install();
    }

    get end() {
        return {
            jhipsterNodeEnd() {
                this.log(chalk.green.bold('\nServer application generated successfully.\n'));

                const executable = 'mvnw clean package -Pdev';

                let logMsgComment = '';
                if (os.platform() === 'win32') {
                    logMsgComment = ` (${chalk.yellow.bold(executable)} if using Windows Command Prompt)`;
                }
                this.log(chalk.green(`Run your Spring Boot application:\n${chalk.yellow.bold(`./${executable}`)}${logMsgComment}`));
            }
        };
        // Here we are not overriding this phase and hence its being handled by JHipster
        // return super._end();
    }
};
