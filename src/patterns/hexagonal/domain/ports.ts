import type { Note } from './note';

export type NotesPort = {
  listNotes: () => Promise<Note[]>;
};
