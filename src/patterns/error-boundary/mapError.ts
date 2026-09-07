export type MappedError = {
  code: string;
  title: string;
  message: string;
};

export class AppError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

export function mapError(error: unknown): MappedError {
  if (error instanceof AppError) {
    return {
      code: error.code,
      title: 'Operación rechazada',
      message: error.message,
    };
  }
  if (error instanceof TypeError) {
    return {
      code: 'NETWORK',
      title: 'Red no disponible',
      message: 'No hay respuesta del servidor.',
    };
  }
  if (error instanceof Error) {
    return {
      code: 'UNKNOWN',
      title: 'Error inesperado',
      message: error.message,
    };
  }
  return {
    code: 'UNKNOWN',
    title: 'Error inesperado',
    message: 'No se pudo completar la acción.',
  };
}
