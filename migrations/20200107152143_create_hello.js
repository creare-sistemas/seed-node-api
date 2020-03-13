const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex
 */
const up = knex => {
  return knex.schema.createTable('hello', table => {
    table.bigIncrements('hello_id').unsigned();
    table.string('hello_name').notNullable();
    table.string('hello_text', 100).notNullable();
    table.unique(['hello_name', 'hello_text']);
    knexHelper.addCreatedAt(knex, table, true);
    knexHelper.addUpdatedAt(knex, table, true);
  });
};

/**
 * @param {import('knex')} knex
 */
const down = knex => {
  return knex.schema.dropTable('hello');
};

module.exports = { up, down };
