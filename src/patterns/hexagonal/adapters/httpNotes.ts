import type { Note } from '../domain/note';
import type { NotesPort } from '../domain/ports';

export function createHttpNotes(baseUrl: string): NotesPort {
  return {
    async listNotes(): Promise<Note[]> {
      const res = await fetch(`${baseUrl}/notes`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as Note[];
    },
  };
}
