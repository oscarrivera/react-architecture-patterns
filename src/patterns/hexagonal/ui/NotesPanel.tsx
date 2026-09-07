import type { NotesView } from '../domain/useNotes';

type Props = {
  view: NotesView;
};

export function NotesPanel({ view }: Props) {
  if (view.status === 'loading') {
    return <p>Cargando notas…</p>;
  }
  if (view.status === 'failed') {
    return <p className="error">No se pudieron cargar las notas: {view.message}</p>;
  }
  return (
    <ul>
      {view.notes.map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}
