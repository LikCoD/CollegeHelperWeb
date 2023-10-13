import { ChangeDetectionStrategy, Component, Input, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Plug } from '@shared/components/skeleton-plug/skeleton-plug.entities';
import { SkeletonPlugComponent } from '@shared/components/skeleton-plug/skeleton-plug.component';

@Component({
  selector: 'plugable',
  standalone: true,
  imports: [CommonModule, SkeletonPlugComponent],
  templateUrl: './plugable.component.html',
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
export class PlugableComponent {
  @Input({ required: true }) dataComponent!: Type<any>;
  @Input({ required: true }) plugComponent!: Type<any>;
  observable!: Observable<any>;

  plug = signal<Plug | null>({ type: 'loading' });

  @Input({ required: true, alias: 'observable' })
  set _observable(observable: Observable<any>) {
    this.observable = observable.pipe(
      tap({
        next: v => this.plug.set(!!v ? null : { type: 'empty', text: 'noData' }),
        error: e => this.plug.set({ type: 'error', text: e }),
      })
    );
  }
}
