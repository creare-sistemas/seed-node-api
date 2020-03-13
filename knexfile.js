const env = require('./src/env');

/**
 * @type {import('knex')}
 */
module.exports = {
  client: 'postgresql',
  connection: {
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    port: env.DB_PORT,
  },
  pool: {
    min: env.DB_POOL_MIN,
    max: env.DB_POOL_MAX,
  },
  migrations: {
    tableName: 'migrations',
  },
};
