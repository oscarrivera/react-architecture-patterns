import { useCallback, useState } from 'react';
import { useFetchMachine } from './useFetchMachine';

function fakeLoad(fail: boolean): Promise<{ quote: string }> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (fail) {
        reject(new Error('timeout de red'));
        return;
      }
      resolve({ quote: 'El estado loading no acepta SUCCESS si ya se reseteó.' });
    }, 80);
  });
}

export function AsyncMachinePage() {
  const [fail, setFail] = useState(false);
  const load = useCallback(() => fakeLoad(fail), [fail]);
  const { state, run, reset } = useFetchMachine(load);

  return (
    <section className="card">
      <h2>Máquina de estados async</h2>
      <p className="muted">
        Estados: <code>idle</code>, <code>loading</code>, <code>success</code>,{' '}
        <code>error</code>. SUCCESS y FAILURE se ignoran si el estado ya no es
        loading.
      </p>
      <label>
        <input
          type="checkbox"
          checked={fail}
          onChange={(event) => setFail(event.target.checked)}
        />{' '}
        Forzar error
      </label>
      <p>
        <button type="button" onClick={() => void run()}>
          Cargar
        </button>{' '}
        <button type="button" onClick={reset}>
          Reset
        </button>
      </p>
      <p>
        Estado: <strong>{state.status}</strong>
      </p>
      {state.status === 'success' ? <p className="ok">{state.data.quote}</p> : null}
      {state.status === 'error' ? <p className="error">{state.message}</p> : null}
    </section>
  );
}
