const {
  CodedError,
  NotFoundError,
  ResourceNotFoundError,
  ValidationError,
  UnavailableServiceError,
  ResourceAlreadyExistsException,
  InvalidFileFormatException,
  AccessDeniedException,
  ResourceNotFoundException,
} = require('../../errors');

const logger = require('../../logger');
const i18n = require('../../i18n');

/**
 * @typedef ErrorConfig
 * @type {Object}
 * @property {typeof CodedError} class
 * @property {String} i18n
 */

/**
 * @type {ErrorConfig[]}
 */
const errorsConfigs = [
  { class: NotFoundError, i18n: 'error.notFound' },
  { class: ResourceNotFoundError, i18n: 'error.resourceNotFound' },
  { class: ValidationError, i18n: 'error.validation' },
  { class: UnavailableServiceError, i18n: 'error.unavailableService' },
  {
    class: ResourceAlreadyExistsException,
    i18n: 'error.resourceAlreadyExistis',
  },
  { class: InvalidFileFormatException, i18n: 'error.invalidParameter' },
  { class: AccessDeniedException, i18n: 'error.accessDeniedException' },
];

/**
 * @param {Error} error
 */
const getErrorConfig = error =>
  errorsConfigs.find(errorConfig => error instanceof errorConfig.class);

const loadErrorMessage = error => {
  const errorConfig = getErrorConfig(error);
  if (errorConfig) {
    const errorWithMessage = error;
    errorWithMessage.message = i18n.__(errorConfig.i18n);
  }
};

/**
 * @param {*} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof CodedError) {
    loadErrorMessage(err);
  }
  logger.error(`errorHandler: ${err}`);

  if (
    err instanceof NotFoundError ||
    err instanceof ResourceNotFoundError ||
    err instanceof ResourceNotFoundException
  ) {
    return res
      .status(404)
      .send(err)
      .end();
  }

  if (
    err instanceof UnavailableServiceError ||
    err instanceof ValidationError ||
    err instanceof ResourceAlreadyExistsException ||
    err instanceof InvalidFileFormatException
  ) {
    return res
      .status(400)
      .send(err)
      .end();
  }
  return res
    .status(500)
    .send({
      code: 'UNEXPECTED_ERROR',
      message: res.__('error.unexpected'),
    })
    .end();
};

module.exports = errorHandler;
