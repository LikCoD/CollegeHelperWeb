import { ChangeDetectionStrategy, Component, inject, Input, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { Router, RouterLink } from '@angular/router';
import { Head3Component } from '@ui/text/head3.component';
import { P1Component } from '@ui/text/p1.component';
import { Head4Component } from '@ui/text/head4.component';

@Component({
  selector: 'schedule-lesson',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    Head3Component,
    P1Component,
    Head4Component,
  ],
  templateUrl: './schedule-lesson.component.html',
  styleUrls: ['./schedule-lesson.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleLessonComponent {
  isUpdated!: boolean;

  @Input() editable: boolean = false;
  @Input() showForeground: boolean = true;
  @Input() routing: boolean = false;
  @Input() preview: boolean = false;

  query = {
    studyPlaceID: '',
  };

  lesson!: ScheduleLesson;

  private studyPlaceID!: string;
  private zone = inject(NgZone);
  private router = inject(Router);

  @Input({ required: true, alias: 'lesson' })
  set _lesson(value: ScheduleLesson) {
    this.isUpdated = value.isGeneral ?? false;
    this.studyPlaceID = value.studyPlaceID ?? '';
    this.query = {
      studyPlaceID: this.studyPlaceID,
    };
    this.lesson = value;
  }

  buildRouterLink(type: string): string {
    const lesson: { [key: string]: any } = this.lesson;
    return `/schedule/${type}/${lesson[type]}`;
  }

  navigate(url: string): void {
    this.zone.run(() => this.router.navigate([url], { queryParams: this.query })).then();
  }
}
