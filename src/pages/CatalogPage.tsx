import { Link } from 'react-router-dom';

const items = [
  {
    to: '/hexagonal',
    title: 'Feature folder / hexagonal',
    body: 'El dominio define el puerto. HTTP es un adaptador. La UI no importa fetch.',
  },
  {
    to: '/compound-tabs',
    title: 'Compound components',
    body: 'Tabs.Root comparte estado implícito. El consumidor ensambla List, Tab y Panel.',
  },
  {
    to: '/async-machine',
    title: 'Máquina de estados async',
    body: 'idle → loading → success | error. Transiciones explícitas, sin XState.',
  },
  {
    to: '/error-boundary',
    title: 'Error boundary',
    body: 'Captura el render. mapError traduce el fallo a un mensaje estable.',
  },
  {
    to: '/form-validation',
    title: 'Validación fuera de la UI',
    body: 'validate() es pura. El formulario solo pinta errores.',
  },
];

export function CatalogPage() {
  return (
    <section>
      <p>
        Cada ruta monta un ejemplo mínimo y su test. El README describe cuándo
        aplicar el patrón y qué se paga por ello.
      </p>
      <ul className="catalog">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>{item.title}</Link>
            <p className="muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
