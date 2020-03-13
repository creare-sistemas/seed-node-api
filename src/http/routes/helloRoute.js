const express = require('express');

const helloSchema = require('../schemas/helloSchema');
const schemaValidator = require('../middlewares/schemaValidator');
const HelloController = require('../controllers/helloController');
const container = require('../../container');

const helloController = new HelloController(container);

const router = express.Router({ mergeParams: true });

router.post(
  '/v1/hello',
  schemaValidator(helloSchema.createHello),
  helloController.create.bind(helloController)
);

router.get(
  '/v1/hello/:id',
  schemaValidator(helloSchema.getHelloById),
  helloController.getById.bind(helloController)
);

router.delete(
  '/v1/hello/:id',
  schemaValidator(helloSchema.deleteHello),
  helloController.delete.bind(helloController)
);

module.exports = router;
