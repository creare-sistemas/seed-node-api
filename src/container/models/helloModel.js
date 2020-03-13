const Model = require('./Model');
/**
 * @typedef Hello
 * @type {Object}
 * @property {Number} hello_id
 * @property {String} hello_name
 * @property {String} hello_text
 * @property {Object} created_at
 * @property {Object} updated_at
 * /

/**
 * @extends {Model<Hello>}
 */
class HelloModel extends Model {
  constructor(database) {
    super(database, 'hello');
  }

  /**
   * @param {Number} id
   * @return {Object}
   */
  getById(id) {
    return this.table.where('hello_id', id).first();
  }

  /**
   * @param {Object} hello
   * @return {Object}
   */
  create(hello) {
    return this.table.insert(hello).returning('*');
  }

  /**
   * @param {Number} id
   * @return {Object}
   */
  delete(id) {
    return this.table.where('hello_id', id).delete();
  }
}

module.exports = HelloModel;
