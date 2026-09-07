import { useState, type FormEvent } from 'react';
import { hasErrors, validate, type RegisterErrors, type RegisterInput } from './validate';

const empty: RegisterInput = { email: '', password: '', confirm: '' };

export function RegisterForm() {
  const [values, setValues] = useState<RegisterInput>(empty);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    setSubmitted(!hasErrors(next));
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="email">Correo</label>
        <input
          id="email"
          name="email"
          value={values.email}
          onChange={(event) => setValues({ ...values, email: event.target.value })}
        />
        {errors.email ? <span className="error">{errors.email}</span> : null}
      </div>
      <div className="field">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={(event) => setValues({ ...values, password: event.target.value })}
        />
        {errors.password ? <span className="error">{errors.password}</span> : null}
      </div>
      <div className="field">
        <label htmlFor="confirm">Confirmación</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          value={values.confirm}
          onChange={(event) => setValues({ ...values, confirm: event.target.value })}
        />
        {errors.confirm ? <span className="error">{errors.confirm}</span> : null}
      </div>
      <button type="submit">Enviar</button>
      {submitted ? <p className="ok">Formulario válido.</p> : null}
    </form>
  );
}
