import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';
import { AppError, mapError } from './mapError';

function Bomb() {
  throw new AppError('NOTES_FORBIDDEN', 'sin permiso');
}

describe('mapError', () => {
  it('maps AppError and TypeError', () => {
    expect(mapError(new AppError('X', 'detalle'))).toEqual({
      code: 'X',
      title: 'Operación rechazada',
      message: 'detalle',
    });
    expect(mapError(new TypeError('failed to fetch')).code).toBe('NETWORK');
  });
});

describe('ErrorBoundary', () => {
  it('renders the mapped fallback instead of the child', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Operación rechazada');
    expect(screen.getByRole('alert')).toHaveTextContent('sin permiso');
    expect(screen.getByRole('alert')).toHaveTextContent('NOTES_FORBIDDEN');
    spy.mockRestore();
  });
});
