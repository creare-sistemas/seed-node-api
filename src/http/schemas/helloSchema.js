const Joi = require('@hapi/joi');

const id = Joi.number()
  .min(1)
  .positive();
const helloName = Joi.string()
  .max(100)
  .label(__('error.collections.parameterInvalid.helloName'));
const helloText = Joi.string()
  .max(100)
  .label(__('error.collections.parameterInvalid.helloText'));

exports.createHello = Joi.object({
  body: Joi.object({
    helloName: helloName.required(),
    helloText: helloText.required(),
  }),
});

exports.getHelloById = Joi.object({
  params: Joi.object({
    id: id.required(),
  }),
});

exports.deleteHello = Joi.object({
  params: Joi.object({
    id: id.required(),
  }),
});
