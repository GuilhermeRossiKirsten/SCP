export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ValidationError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Um erro de validação aconteceu.", {
      cause,
    });
    this.name = "ValidationError";
    this.action = action || "Ajuste os dados enviados e tente novamente.";
    this.statusCode = 409;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
export class NotFoundError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Não foi possível encontrar o recurso.", {
      cause,
    });
    this.name = "NotFoundError";
    this.action = action || "Ajuste os dados enviados e tente novamente.";
    this.statusCode = 404;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class UnauthorizedError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Usuário não autenticado.", {
      cause,
    });
    this.name = "UnauthorizedError";
    this.action = action || "Faça novamente o login para continuar.";
    this.statusCode = 401;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class NumberOutOfRangeError extends Error {
  constructor({ cause, message, action, value }) {
    super(
      message ||
        `O valor fornecido (${value}) está fora do intervalo permitido (1 a 100).`,
      {
        cause,
      },
    );
    this.name = "NumberOutOfRangeError";
    this.action = action || "Envie um número entre 1 e 100 e tente novamente.";
    this.statusCode = 400;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class RateLimitError extends Error {
  constructor({ cause, message, action, retryAfterSeconds }) {
    super(
      message ||
        `Você atingiu o limite de requisições. Aguarde ${retryAfterSeconds} segundos.`,
      { cause },
    );
    this.name = "RateLimitError";
    this.action =
      action ||
      `Aguarde ${retryAfterSeconds} segundos antes de tentar novamente.`;
    this.statusCode = 429;
    this.retryAfterSeconds = retryAfterSeconds;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
      retry_after_seconds: this.retryAfterSeconds,
    };
  }
}

//Error 502
export class BadGatewayError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Erro de gateway.", {
      cause,
    });
    this.name = "BadGatewayError";
    this.action = action || "Tente novamente mais tarde.";
    this.statusCode = 502;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
