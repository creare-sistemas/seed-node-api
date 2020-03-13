const Joi = require('@hapi/joi');

const { ValidationError } = require('../../errors');
const i18n = require('../../i18n');

module.exports = schema => {
  return (req, res, next) => {
    const { lang } = req.query;
    const locales = i18n.getLocales();
    if (lang && locales.length > 1 && locales.find(locale => locale === lang)) {
      i18n.setLocale(lang);
    }
    const validation = Joi.validate(req, schema, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      return next(
        new ValidationError(
          req.__('error.validation'),
          validation.error.details
        )
      );
    }

    Object.assign(req, validation.value);

    return next();
  };
};
