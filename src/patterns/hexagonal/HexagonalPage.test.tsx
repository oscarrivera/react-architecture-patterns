import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createMemoryNotes } from './adapters/memoryNotes';
import { HexagonalPage } from './HexagonalPage';
import { NotesPanel } from './ui/NotesPanel';

describe('hexagonal notes', () => {
  it('renders notes from the injected port', async () => {
    render(<HexagonalPage />);
    expect(await screen.findByText('Arquitectura hexagonal en el cliente')).toBeInTheDocument();
    expect(screen.getByText('El puerto vive en el dominio')).toBeInTheDocument();
  });

  it('keeps the panel ignorant of HTTP', () => {
    const port = createMemoryNotes([{ id: '9', title: 'Nota de prueba' }]);
    expect(port.listNotes).toBeTypeOf('function');
    render(
      <NotesPanel
        view={{ status: 'ready', notes: [{ id: '9', title: 'Nota de prueba' }] }}
      />,
    );
    expect(screen.getByText('Nota de prueba')).toBeInTheDocument();
  });
});
