type Listener<TState> = (state: TState) => void;

export type Store<TState> = {
  getState: () => TState;
  setState: (nextState: Partial<TState> | ((state: TState) => Partial<TState>)) => void;
  subscribe: (listener: Listener<TState>) => () => void;
};

export function createStore<TState extends Record<string, unknown>>(initialState: TState): Store<TState> {
  let state = initialState;
  const listeners = new Set<Listener<TState>>();

  return {
    getState() {
      return state;
    },
    setState(nextState) {
      const patch = typeof nextState === "function" ? nextState(state) : nextState;
      state = { ...state, ...patch };
      listeners.forEach((listener) => listener(state));
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}
