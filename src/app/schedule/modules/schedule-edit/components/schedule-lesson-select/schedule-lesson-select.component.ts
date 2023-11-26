import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { FormControl } from '@angular/forms';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'schedule-lesson-select',
  templateUrl: './schedule-lesson-select.component.html',
  styleUrls: ['./schedule-lesson-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleLessonSelectComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) lessons: ScheduleLesson[] = [];
  @Output() onSelect = new EventEmitter<ScheduleLesson | null>();

  searchFormControl = new FormControl<string>('');

  searchedLessons$ = signal<ScheduleLesson[] | null>(null);

  private searchSubscription?: Subscription;

  ngOnInit(): void {
    this.searchSubscription = this.searchFormControl.valueChanges
      .pipe(map(() => this.lessons.filter(this.isLessonInSearch.bind(this))))
      .subscribe(l => this.searchedLessons$.set(l));
  }

  ngAfterViewInit(): void {
    this.searchFormControl.updateValueAndValidity();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lessons']) this.searchFormControl.updateValueAndValidity();
  }

  select(lesson: ScheduleLesson | null = null): void {
    this.onSelect.emit(lesson);
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
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
