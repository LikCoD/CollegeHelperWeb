import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { ScheduleLessonComponent } from '@schedule/components/schedule-lesson/schedule-lesson.component';
import { IconComponent } from '@ui/images/icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MoreIndicatorComponent } from '@ui/indicators/more-indicator.component';
import { KeypressService } from '@shared/services/keypress.service';
import { Observable } from 'rxjs';
import { IModeCalculator } from '@schedule/components/base-schedule/mode-calculators/base-mode-calculator';
import { WrappedCarouselComponent } from '@shared/modules/ui/components/carousels/wrapped-carousel/wrapped-carousel.component';
import { CarouselItemDirective } from '@shared/modules/ui/components/carousels/carousel-item.directive';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { ScheduleEditModule } from '@schedule/modules/schedule-edit/schedule-edit.module';

@Component({
  selector: 'schedule-cell',
  standalone: true,
  imports: [
    CommonModule,
    ScheduleLessonComponent,
    IconComponent,
    MatTooltipModule,
    MoreIndicatorComponent,
    WrappedCarouselComponent,
    CarouselItemDirective,
    MatMenuModule,
    TranslateModule,
    ScheduleEditModule,
  ],
  templateUrl: './schedule-cell.component.html',
  styleUrls: ['./schedule-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleCellComponent implements OnInit {
  @Input({ required: false }) lessons!: ScheduleLesson[];
  @Input() isEditMode: boolean = true;

  @Output() delete = new EventEmitter<null>();
  @Output() edit = new EventEmitter<null>();

  instantRouting = signal(false);
  control$!: Observable<{ pressed: boolean }>;

  private keypress = inject(KeypressService);

  @Input({ required: true, alias: 'modeCalculator' }) set _modeCalculator(c: IModeCalculator) {
    this.instantRouting.set(c.instantRouting);
  }

  ngOnInit(): void {
    this.control$ = this.keypress.control$;
  }

  lessonTooltip(): string {
    const lesson = this.lessons[0];
    return `${lesson.startDate.toFormat('h:mm a')}-${lesson.endDate.toFormat('h:mm a')}`;
  }
}
