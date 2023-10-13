import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { ScheduleLessonComponent } from '@schedule/components/schedule-lesson/schedule-lesson.component';
import { IconComponent } from '@ui/images/icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MoreIndicatorComponent } from '@ui/indicators/more-indicator.component';

@Component({
  selector: 'schedule-cell',
  standalone: true,
  imports: [CommonModule, ScheduleLessonComponent, IconComponent, MatTooltipModule, MoreIndicatorComponent],
  templateUrl: './schedule-cell.component.html',
  styleUrls: ['./schedule-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleCellComponent implements AfterViewInit {
  @Input({ required: false }) lessons!: ScheduleLesson[];
  @Input() isEditMode!: boolean;
  @Output() delete = new EventEmitter<null>();
  @Output() edit = new EventEmitter<null>();
  @ViewChild('section') sectionRef!: ElementRef<HTMLElement>;

  scrollable = signal(false);

  private cdr = inject(ChangeDetectorRef);

  get sectionEl(): HTMLElement {
    return this.sectionRef.nativeElement;
  }

  get sectionWidth(): number {
    return this.sectionEl.clientWidth;
  }

  ngAfterViewInit(): void {
    this.scrollable.set(this.sectionEl.clientWidth !== this.sectionEl.scrollWidth);
    this.cdr.detectChanges();
  }

  next(): void {
    if (this.sectionEl.scrollLeft === this.sectionEl.scrollWidth - this.sectionWidth) {
      this.sectionEl.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    this.sectionEl.scrollBy({ left: this.sectionWidth, behavior: 'smooth' });
  }

  previous(): void {
    if (this.sectionEl.scrollLeft === 0) {
      this.sectionEl.scrollTo({
        left: this.sectionEl.scrollWidth - this.sectionWidth,
        behavior: 'smooth',
      });
      return;
    }

    this.sectionEl.scrollBy({ left: -this.sectionWidth, behavior: 'smooth' });
  }

  lessonTooltip(): string {
    const lesson = this.lessons[0];
    return `${lesson.startDate.toFormat('h:mm a')}-${lesson.endDate.toFormat('h:mm a')}`;
  }
}
