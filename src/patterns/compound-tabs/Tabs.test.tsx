import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tabs } from './Tabs';

describe('compound Tabs', () => {
  it('shows the default panel and switches on click', async () => {
    const user = userEvent.setup();
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Tab id="a">Uno</Tabs.Tab>
          <Tabs.Tab id="b">Dos</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="a">Panel A</Tabs.Panel>
        <Tabs.Panel id="b">Panel B</Tabs.Panel>
      </Tabs.Root>,
    );

    expect(screen.getByText('Panel A')).toBeInTheDocument();
    expect(screen.queryByText('Panel B')).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Dos' }));
    expect(screen.getByText('Panel B')).toBeInTheDocument();
    expect(screen.queryByText('Panel A')).not.toBeInTheDocument();
  });
});
