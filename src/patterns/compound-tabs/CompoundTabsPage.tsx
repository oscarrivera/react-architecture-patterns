import { Tabs } from './Tabs';

export function CompoundTabsPage() {
  return (
    <section className="card">
      <h2>Compound components</h2>
      <p className="muted">
        El estado vive en <code>Tabs.Root</code>. List, Tab y Panel se
        componen sin props de control en cada hijo.
      </p>
      <Tabs.Root defaultValue="estructura">
        <Tabs.List>
          <Tabs.Tab id="estructura">Estructura</Tabs.Tab>
          <Tabs.Tab id="contrato">Contrato</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="estructura">
          Un compound component expone piezas con el mismo contexto. El árbol
          queda legible: lista, pestañas, paneles.
        </Tabs.Panel>
        <Tabs.Panel id="contrato">
          Cada Tab declara un id. El Panel con el mismo id es el único visible.
        </Tabs.Panel>
      </Tabs.Root>
    </section>
  );
}
