import { Directive } from '@angular/core';
import { StructureDirective } from './structure.directive';

@Directive({
  selector: '[stateMapperErrorState]',
  standalone: true,
})
export class ErrorStateDirective extends StructureDirective {}
