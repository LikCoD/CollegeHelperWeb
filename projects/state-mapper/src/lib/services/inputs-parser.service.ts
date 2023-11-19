import { Injectable } from '@angular/core';
import { CustomState, State } from '../entities/states.entities';

@Injectable({
  providedIn: 'root',
})
export class InputsParserService {
  parse(state: State<any>): any {
    switch (state.state) {
      case 'loading':
      case 'empty':
        return { type: state.state };
      case 'error':
        return { type: state.state, error: state.error };
      case 'loaded':
        return { type: state.state, data: state.data };
      default:
        const custom = state as CustomState<any>;
        return { type: state.state, data: custom.data, error: custom.error, meta: custom.meta };
    }
  }
}
