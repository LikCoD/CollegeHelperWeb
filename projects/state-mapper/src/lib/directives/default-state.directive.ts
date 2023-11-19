import { Directive } from '@angular/core';
import { StructureDirective } from './structure.directive';

@Directive({
  selector: '[stateMapperDefaultState]',
  standalone: true,
})
export class DefaultStateDirective extends StructureDirective {}
