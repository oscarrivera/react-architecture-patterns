import { NavLink, Route, Routes } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { HexagonalPage } from './patterns/hexagonal/HexagonalPage';
import { CompoundTabsPage } from './patterns/compound-tabs/CompoundTabsPage';
import { AsyncMachinePage } from './patterns/async-machine/AsyncMachinePage';
import { ErrorBoundaryPage } from './patterns/error-boundary/ErrorBoundaryPage';
import { FormValidationPage } from './patterns/form-validation/FormValidationPage';

const links = [
  { to: '/', label: 'Catálogo', end: true },
  { to: '/hexagonal', label: 'Carpetas / hexagonal' },
  { to: '/compound-tabs', label: 'Compound components' },
  { to: '/async-machine', label: 'Máquina async' },
  { to: '/error-boundary', label: 'Error boundary' },
  { to: '/form-validation', label: 'Validación de formulario' },
];

export function App() {
  return (
    <div className="layout">
      <header>
        <h1>Patrones de arquitectura React</h1>
        <p className="muted">Catálogo ejecutable. TypeScript. Sin estado global de framework.</p>
        <nav className="pattern-nav" aria-label="Patrones">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/hexagonal" element={<HexagonalPage />} />
        <Route path="/compound-tabs" element={<CompoundTabsPage />} />
        <Route path="/async-machine" element={<AsyncMachinePage />} />
        <Route path="/error-boundary" element={<ErrorBoundaryPage />} />
        <Route path="/form-validation" element={<FormValidationPage />} />
      </Routes>
    </div>
  );
}
