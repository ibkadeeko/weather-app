export class ApplicationError extends Error {
  status: number;
  code: string;
  date: string;
  constructor(message: string, status = 400, code: string) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError);
    }
    const date = new Date();
    this.name = 'ApplicationError';
    this.code = code;
    this.status = status;
    this.date = date.toISOString();
  }
}

class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message, 400, 'BadRequestError');
    this.name = 'BadRequestError';
  }
}

class UnauthorizedError extends ApplicationError {
  constructor(message: string) {
    super(message, 401, 'UnauthorizedError');
    this.name = 'UnauthorizedError';
  }
}

class InvalidCredentialsError extends ApplicationError {
  constructor(message: string) {
    super(message, 401, 'InvalidCredentialsError');
    this.name = 'InvalidCredentialsError';
  }
}
class ForbiddenError extends ApplicationError {
  constructor(message: string) {
    super(message, 403, 'ForbiddenError');
    this.name = 'ForbiddenError';
  }
}

class NotAuthorizedError extends ApplicationError {
  constructor(message: string) {
    super(message, 403, 'NotAuthorizedError');
    this.name = 'NotAuthorizedError';
  }
}
class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message, 404, 'NotFoundError');
    this.name = 'NotFoundError';
  }
}

class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(message, 409, 'ConflictError');
    this.name = 'ConflictError';
  }
}

class InvalidArgumentError extends ApplicationError {
  constructor(message: string) {
    super(message, 409, 'InvalidArgumentError');
    this.name = 'InvalidArgumentError';
  }
}

class TooManyRequestsError extends ApplicationError {
  constructor(message: string) {
    super(message, 429, 'TooManyRequestsError');
    this.name = 'TooManyRequestsError';
  }
}

class InternalServerError extends ApplicationError {
  constructor(message: string) {
    super(message, 500, 'InternalServerError');
    this.name = 'InternalServerError';
  }
}

class BadGatewayError extends ApplicationError {
  constructor(message: string) {
    super(message, 502, 'BadGatewayError');
    this.name = 'BadGatewayError';
  }
}

class ServiceUnavailableError extends ApplicationError {
  constructor(message: string) {
    super(message, 503, 'ServiceUnavailableError');
    this.name = 'ServiceUnavailableError';
  }
}

class GatewayTimeoutError extends ApplicationError {
  constructor(message: string) {
    super(message, 504, 'GatewayTimeoutError');
    this.name = 'GatewayTimeoutError';
  }
}

export default {
  ApplicationError,
  BadRequestError,
  UnauthorizedError,
  InvalidCredentialsError,
  ForbiddenError,
  NotAuthorizedError,
  NotFoundError,
  ConflictError,
  InvalidArgumentError,
  TooManyRequestsError,
  InternalServerError,
  BadGatewayError,
  ServiceUnavailableError,
  GatewayTimeoutError,
};
