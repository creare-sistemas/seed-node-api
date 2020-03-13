class CodedError extends Error {
  constructor(code, message = 'Error') {
    super(message);
    this.code = code;
  }
  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}

class DetailedCodedError extends CodedError {
  constructor(code, message, details) {
    super(code, message);
    this.details = details;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}

class NotFoundError extends CodedError {
  constructor(message) {
    super('NOT_FOUND', message);
  }
}

class ResourceNotFoundError extends DetailedCodedError {
  constructor(detail) {
    super('RESOURCE_NOT_FOUND', null, detail);
  }
}

class ValidationError extends DetailedCodedError {
  constructor(message, details) {
    super('VALIDATION_FAILED', message, details);
  }
}

class UnavailableServiceError extends DetailedCodedError {
  constructor(message, details) {
    super('UNAVAILABLE_SERVICE', message, details);
  }
}

class ResourceAlreadyExistsException extends DetailedCodedError {
  constructor(details) {
    super('RESOURCE_ALREADY_EXISTS', null, details);
  }
}

class AccessDeniedException extends DetailedCodedError {
  constructor(message, details) {
    super('ACCESS_DENIED', message, details);
  }
}

class InvalidParameterException extends DetailedCodedError {
  constructor(message, details) {
    super('INVALID_INPUT_PARAMETER', message, details);
  }
}

class ResourceNotFoundException extends DetailedCodedError {
  constructor(message, details) {
    super('RESOURCE_NOT_FOUND', message, details);
  }
}

class InvalidFileFormatException extends DetailedCodedError {
  constructor(message, details) {
    super('RESOURCE_NOT_FOUND', message, details);
  }
}

module.exports = {
  CodedError,
  NotFoundError,
  ValidationError,
  ResourceNotFoundError,
  UnavailableServiceError,
  ResourceAlreadyExistsException,
  InvalidParameterException,
  AccessDeniedException,
  ResourceNotFoundException,
  InvalidFileFormatException,
};
