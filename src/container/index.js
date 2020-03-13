const env = require('../env');
const logger = require('../logger');
const knex = require('knex');
const knexFile = require('../../knexfile');

const database = knex(knexFile);
/** Models */
const HelloModel = require('./models/helloModel');

/** Services */
const HelloService = require('./services/helloService');

/** Integrations */
const AwsIntegration = require('./integrations/awsIntegration');

if (env.NODE_ENV === 'development') {
  database.on('query', query => {
    let { sql } = query;
    if (query.bindings) {
      query.bindings.forEach(binding => {
        sql = sql.replace('?', binding);
      });
    }
    logger.info(sql);
  });
}

/**
 * @typedef ModelContainer
 * @type {Object}
 * @property {HelloModel} HelloModel
 */

/**
 * @type {ModelContainer}
 */
const models = {
  HelloModel: new HelloModel(database),
};

/**
 * @typedef IntegrationContainer
 * @property {AwsIntegration} awsIntegration
 */

/**
 * @type {IntegrationContainer}
 */
const integrations = {
  awsIntegration: new AwsIntegration(),
};

/**
 * @typedef ServiceContext
 * @type {ModelContainer & IntegrationContainer}
 */

/**
 * @type {ServiceContext}
 */
const serviceContext = { ...models, ...integrations };

/**
 * @typedef ServiceContainer
 * @property {HelloService} helloService
 */

/** @type {ServiceContainer} */
const services = {
  helloService: new HelloService(serviceContext),
};

/**
 * @typedef Container
 * @type {ServiceContainer}
 */

/** @type {Container} */
const container = {
  ...services,
};

module.exports = container;
