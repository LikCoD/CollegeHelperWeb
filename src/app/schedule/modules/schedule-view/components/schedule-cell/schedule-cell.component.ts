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
import { ScheduleLesson } from '@schedule/entities/schedule';
import { KeypressService } from '@shared/services/keypress.service';
import { Observable } from 'rxjs';
import { IModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/base-mode-calculator';

@Component({
  selector: 'schedule-cell',
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
