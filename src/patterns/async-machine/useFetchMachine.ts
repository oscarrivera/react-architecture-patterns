import { useCallback, useReducer } from 'react';
import { fetchReducer, idleState, type FetchState } from './fetchMachine';

type LoadFn<T> = () => Promise<T>;

export function useFetchMachine<T>(load: LoadFn<T>) {
  const [state, dispatch] = useReducer(fetchReducer<T>, idleState);

  const run = useCallback(async () => {
    dispatch({ type: 'FETCH' });
    try {
      const data = await load();
      dispatch({ type: 'SUCCESS', data });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'error desconocido';
      dispatch({ type: 'FAILURE', message });
    }
  }, [load]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return { state: state as FetchState<T>, run, reset };
}
