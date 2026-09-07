import { useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { AppError } from './mapError';

function Boom({ armed }: { armed: boolean }) {
  if (armed) {
    throw new AppError('NOTES_FORBIDDEN', 'Esta vista no tiene permiso para el recurso.');
  }
  return <p>La vista se renderiza con normalidad.</p>;
}

export function ErrorBoundaryPage() {
  const [armed, setArmed] = useState(false);

  return (
    <section className="card">
      <h2>Error boundary</h2>
      <p className="muted">
        El boundary atrapa el throw en render. <code>mapError</code> convierte
        el valor en título, mensaje y código. No sustituye a un logger remoto.
      </p>
      <button type="button" onClick={() => setArmed(true)}>
        Provocar error de render
      </button>
      <ErrorBoundary>
        <Boom armed={armed} />
      </ErrorBoundary>
    </section>
  );
}
