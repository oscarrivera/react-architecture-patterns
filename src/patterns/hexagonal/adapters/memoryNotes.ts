import type { Note } from '../domain/note';
import type { NotesPort } from '../domain/ports';

const SEED: Note[] = [
  { id: '1', title: 'Arquitectura hexagonal en el cliente' },
  { id: '2', title: 'El puerto vive en el dominio' },
];

export function createMemoryNotes(notes: Note[] = SEED): NotesPort {
  return {
    async listNotes(): Promise<Note[]> {
      return [...notes];
    },
  };
}
