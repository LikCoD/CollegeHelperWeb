import {
  IModeCalculator,
  MarkupEntry,
  Row,
} from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/base-mode-calculator';
import { Schedule, ScheduleLesson } from '@schedule/entities/schedule';
import { DateTime } from 'luxon';

export class TableModeCalculator implements IModeCalculator {
  rows!: Row[];
  markup!: MarkupEntry[];
  instantRouting = false;

  private start!: DateTime;
  private rowIndent = 10;
  private rowHeight = 100;

  init(schedule: Schedule): void {
    this.start = schedule.info.startDate;
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

  x(lessons: ScheduleLesson[]): number {
    const date = lessons[0].endDate;
    return Math.floor(date.diff(this.start, 'day').days) + 1;
  }

  styles(_: ScheduleLesson[]): any {
    return {};
  }
}
