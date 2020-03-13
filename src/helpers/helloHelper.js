const {
  ResourceAlreadyExistsException,
  ValidationError,
  ResourceNotFoundError,
} = require('../errors');

class HelloHelper {
  /**
   *
   * @param {import('../container/models/helloModel').Hello} hello
   */
  validationAlreadyExists(hello) {
    if (hello !== undefined && hello.hello_id) {
      throw new ResourceAlreadyExistsException(
        `Hello already exists. ID= ${hello.hello_id}`
      );
    }
  }

  /**
   *
   * @param {import('../container/models/helloModel').Hello} hello
   */
  convertToHelloResponse(hello) {
    if (hello == null) {
      throw new ValidationError();
    }
    return {
      helloId: hello.hello_id,
      helloName: hello.hello_name,
      helloText: hello.hello_text,
      createdAt: hello.created_at,
      updatedAt: hello.updated_at,
    };
  }

  /**
   *
   * @param {import('../container/models/helloModel').Hello} hello
   */
  validationNotFound(hello) {
    if (hello === undefined) {
      throw new ResourceNotFoundError('Hello Not Found');
    }
  }
}

module.exports = HelloHelper;
