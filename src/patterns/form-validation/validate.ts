export type RegisterInput = {
  email: string;
  password: string;
  confirm: string;
};

export type RegisterErrors = Partial<Record<keyof RegisterInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(input: RegisterInput): RegisterErrors {
  const errors: RegisterErrors = {};
  if (!EMAIL.test(input.email.trim())) {
    errors.email = 'Correo no válido';
  }
  if (input.password.length < 10) {
    errors.password = 'Mínimo 10 caracteres';
  }
  if (input.confirm !== input.password) {
    errors.confirm = 'No coincide';
  }
  return errors;
}

export function hasErrors(errors: RegisterErrors): boolean {
  return Object.keys(errors).length > 0;
}
