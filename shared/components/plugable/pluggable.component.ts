import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SkeletonPlugComponent } from '@shared/components/skeleton-plug/skeleton-plug.component';
import { Pluggable } from '@shared/components/plugable/pluggable.entites';

@Component({
  selector: 'pluggable',
  standalone: true,
  imports: [CommonModule, SkeletonPlugComponent],
  templateUrl: './pluggable.component.html',
  styles: [
    `
      :host {
        overflow: hidden;
        display: flex;
        width: 100%;
        height: 100%;
      }

      :host::ng-deep > * {
        width: 100%;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluggableComponent<D> {
  @Input({ required: true }) dataComponent!: Type<any>;
  @Input({ required: true }) plugComponent!: Type<any>;
  @Input({ required: true }) observable!: Observable<Pluggable<D>>;
}
