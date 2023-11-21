import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Head1Component } from '@ui/text/head1.component';
import { Plug } from '@shared/components/skeleton-plug/skeleton-plug.entities';

@Component({
  selector: 'skeleton-plug',
  standalone: true,
  imports: [CommonModule, Head1Component],
  templateUrl: './skeleton-plug.component.html',
  styleUrls: ['./skeleton-plug.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonPlugComponent implements OnChanges {
  @Input({ required: true }) plugComponent!: Type<any>;
  @Input({ required: true }) plug!: Plug | string;

  private host = inject(ElementRef<HTMLElement>);

  get text(): string | null {
    return typeof this.plug === 'string' ? this.plug : this.plug.type;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plug']) {
      const previous = changes['plug'].previousValue;
      const current = changes['plug'].currentValue;

      this.host.nativeElement.classList.remove(
        typeof previous === 'string' ? previous : previous?.type
      );
      this.host.nativeElement.classList.add(typeof current === 'string' ? current : current?.type);
    }
  }
}
