export type PlugType = 'loaded' | 'loading' | 'error' | 'empty';

export interface Plug {
  type: PlugType;
  text?: string;
  showTextOn?: 'hover' | 'click' | 'always';
}
