/**
 * @template T
 */
class Model {
  /**
   * @param {import('knex')} database
   * @param {String} tableName
   */
  constructor(database, tableName) {
    this.tableName = tableName;
    this.database = database;
  }

  get transaction() {
    return this.database.transaction;
  }

  get table() {
    return this.database(this.tableName);
  }

  all() {
    return this.table;
  }

  raw(query) {
    return this.database.raw(query);
  }
}

module.exports = Model;
