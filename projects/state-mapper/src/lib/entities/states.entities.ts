export interface LoadingState {
  state: 'loading';
}

export interface EmptyState {
  state: 'empty';
}

export interface ErrorState {
  state: 'error';
  error: Error;
}

export interface LoadedState<T> {
  state: 'loaded';
  data: T;
}

export interface CustomState<T> {
  state: string;
  data?: T;
  error?: T;
  meta?: { [key: string]: any };
}

export type ReservedStates<T> = LoadingState | EmptyState | ErrorState | LoadedState<T>;
export type State<T> = ReservedStates<T> | CustomState<T>;
