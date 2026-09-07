import { useEffect, useState } from 'react';
import type { Note } from './note';
import type { NotesPort } from './ports';

export type NotesView =
  | { status: 'loading' }
  | { status: 'ready'; notes: Note[] }
  | { status: 'failed'; message: string };

export function useNotes(port: NotesPort): NotesView {
  const [view, setView] = useState<NotesView>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    port
      .listNotes()
      .then((notes) => {
        if (!cancelled) {
          setView({ status: 'ready', notes });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'error desconocido';
          setView({ status: 'failed', message });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [port]);

  return view;
}
