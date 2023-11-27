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

export class TimeModeCalculator implements IModeCalculator {
  private static scale = 2.25;

  rows!: Row[];
  days!: string[];
  markup!: MarkupEntry[];
  instantRouting = false;

  private start!: DateTime;
  private yOffset!: number;

  initSchedule(schedule: Schedule): void {
    const dates = schedule.lessons.flatMap(v => [v.startDate, v.endDate]);

    this.start = schedule.info.startDate;
    this.yOffset = this.yTime(
      dates.reduce((a, b) => (a < b ? a : b), schedule.lessons[0].startDate)
    );

    this.days = [];
    const amount = schedule.info.endDate.diff(schedule.info.startDate, 'days').get('days') + 1;
    for (let i = 0; i < amount; i++) {
      const duration: DurationLikeObject = {};
      duration['days'] = i;
      this.days.push(schedule.info.startDate.plus(duration).toFormat('MMM dd EEE'));
    }

    this.init(schedule, dates);
  }

  initGeneralSchedule(schedule: GeneralSchedule): void {
    const dates = schedule.lessons.flatMap(v => [v.startTimeMinutes, v.endTimeMinutes]);

    const dayIndexes = schedule.lessons.map(l => l.dayIndex);
    this.start = DateTime.fromMillis(0).set({ weekday: Math.min(...dayIndexes) - 1 });

    this.yOffset = this.yTime(
      dates.reduce((a, b) => (a < b ? a : b), schedule.lessons[0].startTimeMinutes)
    );

    this.days = [];
    for (let i = Math.min(...dayIndexes) - 1; i < Math.max(...dayIndexes); i++) {
      const duration: DurationLikeObject = {};
      duration['days'] = i;
      this.days.push(this.getWeekdayByDayIndex(i));
    }

    this.init(schedule, dates);
  }

  init(schedule: Schedule | GeneralSchedule, dates: DateTime[]): void {
    const timeOffset = 15;

    this.rows = [...new Set(dates)].map(
      d => <Row>{ title: d.toFormat('hh:mm a'), y: this.yTime(d) - timeOffset - this.yOffset }
    );

    this.markup = this.rows.map(r => <MarkupEntry>{ y: r.y + timeOffset });
  }

  height(lessons: (ScheduleLesson | ScheduleGeneralLesson)[]): number {
    const start = 'startDate' in lessons[0] ? lessons[0].startDate : lessons[0].startTimeMinutes;
    const end = 'endDate' in lessons[0] ? lessons[0].endDate : lessons[0].endTimeMinutes;

    return end.diff(start, 'minute').minutes * TimeModeCalculator.scale;
  }

  width(_: ScheduleLesson[]): number {
    return 200;
  }

  y(lessons: (ScheduleLesson | ScheduleGeneralLesson)[]): number {
    const date = 'startDate' in lessons[0] ? lessons[0].startDate : lessons[0].startTimeMinutes;
    return this.yTime(date) - this.yOffset;
  }

  x(lessons: (ScheduleLesson | ScheduleGeneralLesson)[]): number {
    const date = 'endDate' in lessons[0] ? lessons[0].endDate : lessons[0].endTimeMinutes;
    return Math.floor(date.diff(this.start, 'day').days) + 1;
  }

  styles(_: ScheduleLesson[]): any {
    return {};
  }

  private yTime(date: DateTime): number {
    return (date.hour * 60 + date.minute) * TimeModeCalculator.scale;
  }

  private getWeekdayByDayIndex(index: number): string {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + index);
    return date.toLocaleDateString(undefined, { weekday: 'long' });
  }
}
