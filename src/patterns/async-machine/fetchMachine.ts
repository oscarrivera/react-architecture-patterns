export type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export type FetchEvent<T> =
  | { type: 'FETCH' }
  | { type: 'SUCCESS'; data: T }
  | { type: 'FAILURE'; message: string }
  | { type: 'RESET' };

export function fetchReducer<T>(
  state: FetchState<T>,
  event: FetchEvent<T>,
): FetchState<T> {
  switch (event.type) {
    case 'FETCH':
      return { status: 'loading' };
    case 'SUCCESS':
      if (state.status !== 'loading') {
        return state;
      }
      return { status: 'success', data: event.data };
    case 'FAILURE':
      if (state.status !== 'loading') {
        return state;
      }
      return { status: 'error', message: event.message };
    case 'RESET':
      return { status: 'idle' };
    default:
      return state;
  }
}

export const idleState: FetchState<never> = { status: 'idle' };
