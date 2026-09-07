import { describe, expect, it } from 'vitest';
import { fetchReducer, idleState } from './fetchMachine';

describe('fetchReducer', () => {
  it('walks idle → loading → success', () => {
    const loading = fetchReducer(idleState, { type: 'FETCH' });
    expect(loading).toEqual({ status: 'loading' });
    const done = fetchReducer(loading, { type: 'SUCCESS', data: 42 });
    expect(done).toEqual({ status: 'success', data: 42 });
  });

  it('ignores SUCCESS unless the machine is loading', () => {
    const next = fetchReducer(idleState, { type: 'SUCCESS', data: 1 });
    expect(next).toEqual(idleState);
  });

  it('moves loading to error and returns to idle on RESET', () => {
    const loading = fetchReducer(idleState, { type: 'FETCH' });
    const failed = fetchReducer(loading, { type: 'FAILURE', message: 'boom' });
    expect(failed).toEqual({ status: 'error', message: 'boom' });
    expect(fetchReducer(failed, { type: 'RESET' })).toEqual(idleState);
  });
});
