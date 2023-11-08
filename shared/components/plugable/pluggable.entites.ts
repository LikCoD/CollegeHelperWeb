import { Plug } from '@shared/components/skeleton-plug/skeleton-plug.entities';

export interface Pluggable<D> {
  plug: Plug;
  data?: D | Error | null;
}
