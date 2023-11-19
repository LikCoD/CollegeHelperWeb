import { Directive } from '@angular/core';
import { StructureDirective } from './structure.directive';

@Directive({
  selector: '[stateMapperLoadedState]',
  standalone: true,
})
export class LoadedStateDirective extends StructureDirective {}
