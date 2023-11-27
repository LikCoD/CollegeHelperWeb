import {
  GeneralSchedule,
  Schedule,
  ScheduleGeneralLesson,
  ScheduleLesson,
} from '@schedule/entities/schedule';
import { DateTime, DurationLikeObject } from 'luxon';
import {
  IModeCalculator,
  MarkupEntry,
  Row,
} from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/base-mode-calculator';

export class ExtendedTableModeCalculator implements IModeCalculator {
  rows!: Row[];
  days!: string[];
  markup!: MarkupEntry[];
  instantRouting = true;

  private start!: DateTime;
  private maxLessonsInRow: { [rowIndex: number]: { amount: number; acc: number } } = {};
  private rowIndent = 10;
  private cellHeight = 100;

  initSchedule(schedule: Schedule): void {
    this.start = schedule.info.startDate;

    const groupedLessons: { [day: string]: { [rowIndex: number]: number } } = {};
    schedule.lessons.forEach(l => {
      const key = l.startDate.toFormat('yyyy-MM-dd');
      groupedLessons[key] ??= {};
      groupedLessons[key][l.lessonIndex] ??= 0;
      groupedLessons[key][l.lessonIndex]++;
    });

    this.days = [];
    const amount = schedule.info.endDate.diff(schedule.info.startDate, 'days').get('days') + 1;
    for (let i = 0; i < amount; i++) {
      const duration: DurationLikeObject = {};
      duration['days'] = i;
      this.days.push(schedule.info.startDate.plus(duration).toFormat('MMM dd EEE'));
    }

    this.init(schedule, groupedLessons);
  }

  initGeneralSchedule(schedule: GeneralSchedule): void {
    const groupedLessons: { [day: number]: { [rowIndex: number]: number } } = {};
    schedule.lessons.forEach(l => {
      const key = l.dayIndex;
      groupedLessons[key] ??= {};
      groupedLessons[key][l.lessonIndex] ??= 0;
      groupedLessons[key][l.lessonIndex]++;
    });

    const dayIndexes = schedule.lessons.map(l => l.dayIndex);
    this.start = DateTime.fromMillis(0).set({ weekday: Math.min(...dayIndexes) - 1 });

    this.days = [];
    for (let i = Math.min(...dayIndexes) - 1; i < Math.max(...dayIndexes); i++) {
      const duration: DurationLikeObject = {};
      duration['days'] = i;
      this.days.push(this.getWeekdayByDayIndex(i));
    }

    this.init(schedule, groupedLessons);
  }

  init(
    schedule: Schedule | GeneralSchedule,
    groupedLessons: {
      [key: string | number]: { [rowIndex: number]: number };
    }
  ): void {
    const maxIndex = Math.max(...schedule.lessons.map(l => l.lessonIndex));

    Object.values(groupedLessons).forEach(d => {
      for (let i = 0; i <= maxIndex; i++) {
        this.maxLessonsInRow[i] ??= { amount: 0, acc: -1 };
        if (!d[i] || this.maxLessonsInRow[i].amount >= d[i]) continue;
        this.maxLessonsInRow[i].amount = d[i];
      }
    });

    Object.values(this.maxLessonsInRow).reduce((acc, i) => {
      i.amount ??= 0;
      i.acc = acc;
      return acc + i.amount;
    }, 0);

    this.rows = Object.values(this.maxLessonsInRow).map(
      (v, i) =>
        <Row>{
          title: `${i + 1}`,
          height: this.cellHeight * v.amount,
          y: this.cellHeight * v.acc + i * this.rowIndent * 2,
        }
    );

    this.markup = this.rows.map(r => <MarkupEntry>{ y: r.y + r.height! + this.rowIndent });
    this.markup.pop();
  }

  height(lessons: ScheduleLesson[]): number {
    return lessons.length * this.cellHeight;
  }

  width(_: ScheduleLesson[]): number {
    return 200;
  }

  y(lessons: ScheduleLesson[]): number {
    const acc = this.maxLessonsInRow[lessons[0].lessonIndex].acc;
    return acc * this.cellHeight + lessons[0].lessonIndex * this.rowIndent * 2;
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
