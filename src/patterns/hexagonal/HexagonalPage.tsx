import { useMemo } from 'react';
import { createMemoryNotes } from './adapters/memoryNotes';
import { useNotes } from './domain/useNotes';
import { NotesPanel } from './ui/NotesPanel';

export function HexagonalPage() {
  const port = useMemo(() => createMemoryNotes(), []);
  const view = useNotes(port);

  return (
    <section className="card">
      <h2>Feature folder / hexagonal</h2>
      <p className="muted">
        <code>useNotes</code> depende de <code>NotesPort</code>. Esta página
        inyecta el adaptador en memoria. En producción se sustituye por{' '}
        <code>createHttpNotes</code>.
      </p>
      <NotesPanel view={view} />
    </section>
  );
}
