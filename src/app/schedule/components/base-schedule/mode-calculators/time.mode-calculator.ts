import {
  IModeCalculator,
  MarkupEntry,
  Row,
} from '@schedule/components/base-schedule/mode-calculators/base-mode-calculator';
import { Schedule, ScheduleLesson } from '@schedule/entities/schedule';
import { DateTime } from 'luxon';

export class TimeModeCalculator implements IModeCalculator {
  private static scale = 2.25;

  rows!: Row[];
  markup!: MarkupEntry[];
  instantRouting = false;

  private start!: DateTime;
  private yOffset!: number;

  init(schedule: Schedule): void {
    const dates = schedule.lessons.flatMap(v => [v.startDate, v.endDate]);

    this.start = schedule.info.startDate;
    this.yOffset = this.yTime(
      dates.reduce((a, b) => (a < b ? a : b), schedule.lessons[0].startDate)
    );

    const timeOffset = 15;

    this.rows = [...new Set(dates)].map(
      d => <Row>{ title: d.toFormat('hh:mm a'), y: this.yTime(d) - timeOffset - this.yOffset }
    );

    this.markup = this.rows.map(r => <MarkupEntry>{ y: r.y + timeOffset });
  }

  height(lessons: ScheduleLesson[]): number {
    const start = lessons[0].startDate;
    const end = lessons[0].endDate;

    return end.diff(start, 'minute').minutes * TimeModeCalculator.scale;
  }

  width(_: ScheduleLesson[]): number {
    return 200;
  }

  y(lessons: ScheduleLesson[]): number {
    const date = lessons[0].startDate;
    return this.yTime(date) - this.yOffset;
  }

  x(lessons: ScheduleLesson[]): number {
    const date = lessons[0].endDate;
    return Math.floor(date.diff(this.start, 'day').days) + 1;
  }

  styles(_: ScheduleLesson[]): any {
    return {};
  }

  private yTime(date: DateTime): number {
    return (date.hour * 60 + date.minute) * TimeModeCalculator.scale;
  }
}
