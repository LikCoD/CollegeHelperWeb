import { Directive } from '@angular/core';
import { StructureDirective } from './structure.directive';

@Directive({
  selector: '[stateMapperEmptyState]',
  standalone: true,
})
export class EmptyStateDirective extends StructureDirective {}
