import {
  IModeCalculator,
  MarkupEntry,
  Row,
} from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/base-mode-calculator';
import {
  GeneralSchedule,
  Schedule,
  ScheduleGeneralLesson,
  ScheduleLesson,
} from '@schedule/entities/schedule';
import { DateTime, DurationLikeObject } from 'luxon';

export class TableModeCalculator implements IModeCalculator {
  rows!: Row[];
  days!: string[];
  markup!: MarkupEntry[];
  instantRouting = false;

  private start!: DateTime;
  private rowIndent = 10;
  private rowHeight = 100;

  initSchedule(schedule: Schedule): void {
    this.start = schedule.info.startDate;

    this.days = [];
    const amount = schedule.info.endDate.diff(schedule.info.startDate, 'days').get('days') + 1;
    for (let i = 0; i < amount; i++) {
      const duration: DurationLikeObject = {};
      duration['days'] = i;
      this.days.push(schedule.info.startDate.plus(duration).toFormat('MMM dd EEE'));
    }

    this.init(schedule);
  }

  initGeneralSchedule(schedule: GeneralSchedule): void {
    const dayIndexes = schedule.lessons.map(l => l.dayIndex);
    this.start = DateTime.fromMillis(0).set({ weekday: Math.min(...dayIndexes) - 1 });

    this.days = [];
    for (let i = Math.min(...dayIndexes) - 1; i < Math.max(...dayIndexes); i++) {
      const duration: DurationLikeObject = {};
      duration['days'] = i;
      this.days.push(this.getWeekdayByDayIndex(i));
    }

    this.init(schedule);
  }

  init(schedule: Schedule | GeneralSchedule): void {
    this.rows = new Array(Math.max(...schedule.lessons.map(l => l.lessonIndex)) + 1).fill(0).map(
      (_, i) =>
        <Row>{
          title: `${i + 1}`,
          height: this.rowHeight,
          y: (this.rowHeight + this.rowIndent * 2) * i,
        }
    );

    this.markup = this.rows.map(r => <MarkupEntry>{ y: r.y + this.rowHeight + this.rowIndent });
    this.markup.pop();
  }

  height(_: ScheduleLesson[]): number {
    return this.rowHeight;
  }

  width(_: ScheduleLesson[]): number {
    return 200;
  }

  y(lessons: ScheduleLesson[]): number {
    return lessons[0].lessonIndex * (this.rowHeight + this.rowIndent * 2);
  }

  x(lessons: (ScheduleLesson | ScheduleGeneralLesson)[]): number {
    const date = 'endDate' in lessons[0] ? lessons[0].endDate : lessons[0].endTimeMinutes;
    return Math.floor(date.diff(this.start, 'day').days) + 1;
  }

  styles(_: ScheduleLesson[]): any {
    return {};
  }

  private getWeekdayByDayIndex(index: number): string {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + index);
    return date.toLocaleDateString(undefined, { weekday: 'long' });
  }
}
