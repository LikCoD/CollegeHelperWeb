import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'schedule-lesson-select',
  templateUrl: './schedule-lesson-select.component.html',
  styleUrls: ['./schedule-lesson-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleLessonSelectComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) lessons: ScheduleLesson[] = [];
  @Output() onSelect = new EventEmitter<ScheduleLesson | null>();

  searchFormControl = new FormControl<string>('');

  searchedLessons$!: Observable<ScheduleLesson[]>;

  ngOnInit(): void {
    this.searchedLessons$ = this.searchFormControl.valueChanges.pipe(
      map(() => this.lessons.filter(this.isLessonInSearch.bind(this)))
    );
  }

  ngAfterViewInit(): void {
    this.searchFormControl.updateValueAndValidity();
  }

  select(lesson: ScheduleLesson | null = null): void {
    this.onSelect.emit(lesson);
  }

  private isLessonInSearch(lesson: ScheduleLesson): boolean {
    const search = this.searchFormControl.value?.toLowerCase();
    if (!search) return true;

    return (
      lesson.subject.toLowerCase().indexOf(search) !== -1 ||
      lesson.teacher.toLowerCase().indexOf(search) !== -1 ||
      lesson.room.toLowerCase().indexOf(search) !== -1 ||
      lesson.group.toLowerCase().indexOf(search) !== -1
    );
  }
}
