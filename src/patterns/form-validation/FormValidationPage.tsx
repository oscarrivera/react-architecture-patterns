import { RegisterForm } from './RegisterForm';

export function FormValidationPage() {
  return (
    <section className="card">
      <h2>Validación fuera de la UI</h2>
      <p className="muted">
        <code>validate()</code> no conoce React. El formulario solo proyecta el
        mapa de errores. Mismo contrato en servidor si se comparte el módulo.
      </p>
      <RegisterForm />
    </section>
  );
}
