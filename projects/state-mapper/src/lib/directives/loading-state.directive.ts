import { Directive } from '@angular/core';
import { StructureDirective } from './structure.directive';

@Directive({
  selector: '[stateMapperLoadingState]',
  standalone: true,
})
export class LoadingStateDirective extends StructureDirective {}
