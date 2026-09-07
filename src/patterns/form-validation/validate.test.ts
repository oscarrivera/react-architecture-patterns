import { describe, expect, it } from 'vitest';
import { hasErrors, validate } from './validate';

describe('validate', () => {
  it('rejects invalid email, short password and mismatch', () => {
    const errors = validate({
      email: 'no-es-correo',
      password: 'corta',
      confirm: 'otra',
    });
    expect(errors.email).toBe('Correo no válido');
    expect(errors.password).toBe('Mínimo 10 caracteres');
    expect(errors.confirm).toBe('No coincide');
    expect(hasErrors(errors)).toBe(true);
  });

  it('accepts a well-formed payload', () => {
    const errors = validate({
      email: 'user@example.com',
      password: 'diezletras!',
      confirm: 'diezletras!',
    });
    expect(errors).toEqual({});
    expect(hasErrors(errors)).toBe(false);
  });
});
