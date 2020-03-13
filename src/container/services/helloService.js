/* eslint-disable max-len */
const logger = require('../../logger');
const { helloHelper } = require('../../helpers');

/**
 * @typedef helloCreateDto
 * @type {Object}
 * @property {String} helloName
 * @property {String} helloText
 */

/**
 * @typedef helloListResponse
 * @type {Object}
 * @property {Number} totalItens
 * @property {Number} totalPages
 * @property {Number} page
 * @property {String} order
 * @property {Array} itens
 */

/**
 * @typedef helloResponse
 * @type {Object}
 * @property {Number} helloId
 * @property {String} helloText
 * @property {Number} helloId
 * @property {Object} createdAt
 * @property {Object} updatedAt
 */

class HelloService {
  /**
   * @param {import('../index').ServiceContext} container
   */
  constructor(container) {
    this.helloModel = container.helloModel;
  }

  /**
   * @param {helloCreateDto} helloCreateDto
   * @return {Promise<helloResponse>}
   */
  async createHello(helloCreateDto) {
    logger.info(`createHello - input data =${JSON.stringify(helloCreateDto)}`);
    return this.helloModel.database.transaction(async trx => {
      const [hello] = await this.helloModel
        .create({
          hello_name: helloCreateDto.helloName,
          hello_text: helloCreateDto.helloText,
        })
        .transacting(trx);
      const helloResponse = helloHelper.convertToHelloResponse(hello);
      logger.info(
        `createHello - output data created with id= ${JSON.stringify(
          helloResponse
        )})`
      );
      return helloResponse;
    });
  }

  /**
   *
   * @param {Number} helloId
   * @returns {Promise<helloResponse>}
   */
  async findHelloById(helloId) {
    logger.info(`findHelloById- input data =${helloId})`);
    const hello = await this.helloModel.getById(helloId);
    helloHelper.validationNotFound(hello);
    const helloResponse = helloHelper.convertToHelloResponse(hello);
    logger.info(
      `findHelloById - output data =${JSON.stringify(helloResponse)})`
    );
    return helloResponse;
  }

  /**
   * @param {Number} helloId
   * @return {Promise<void>}
   */
  async deleteHelloById(helloId) {
    logger.info(`deleteHelloById - input data =${helloId}`);
    await this.helloModel.database.transaction(async trx => {
      await this.helloModel.delete(helloId).transacting(trx);
    });
    logger.info(`deleteHelloById - output data =${helloId})`);
  }
}

module.exports = HelloService;
