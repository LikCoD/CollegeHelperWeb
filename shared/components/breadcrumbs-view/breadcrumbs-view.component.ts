import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@ui/images/icon.component';
import { Head3Component } from '@ui/text/head3.component';

@Component({
  selector: 'breadcrumbs-view',
  standalone: true,
  imports: [CommonModule, IconComponent, Head3Component],
  templateUrl: './breadcrumbs-view.component.html',
  styleUrl: './breadcrumbs-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsViewComponent {
  @Input({ required: true }) items!: string[];

  @Input() divider: string = 'chevron_right';
}
