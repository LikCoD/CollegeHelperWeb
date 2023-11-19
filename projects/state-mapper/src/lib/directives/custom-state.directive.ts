import { Directive, Input } from '@angular/core';
import { StructureDirective } from './structure.directive';

@Directive({
  selector: '[stateMapperCustomState]',
  standalone: true,
})
export class CustomStateDirective extends StructureDirective {
  @Input({ alias: 'stateMapperCustomStateState', required: true }) state!: string;
}
