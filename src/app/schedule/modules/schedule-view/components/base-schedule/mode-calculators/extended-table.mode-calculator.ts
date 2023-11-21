import { Schedule, ScheduleLesson } from '@schedule/entities/schedule';
import { DateTime } from 'luxon';
import {
  IModeCalculator,
  MarkupEntry,
  Row,
} from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/base-mode-calculator';

export class ExtendedTableModeCalculator implements IModeCalculator {
  rows!: Row[];
  markup!: MarkupEntry[];
  instantRouting = true;

  private start!: DateTime;
  private maxLessonsInRow: { [rowIndex: number]: { amount: number; acc: number } } = {};
  private rowIndent = 10;
  private cellHeight = 100;

  init(schedule: Schedule): void {
    this.start = schedule.info.startDate;

    const dayLessons: { [day: string]: { [rowIndex: number]: number } } = {};
    schedule.lessons.forEach(l => {
      const key = l.startDate.toFormat('yyyy-MM-dd');
      dayLessons[key] ??= {};
      dayLessons[key][l.lessonIndex] ??= 0;
      dayLessons[key][l.lessonIndex]++;
    });

    const maxIndex = Math.max(...schedule.lessons.map(l => l.lessonIndex));

    Object.values(dayLessons).forEach(d => {
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

  x(lessons: ScheduleLesson[]): number {
    const date = lessons[0].endDate;
    return Math.floor(date.diff(this.start, 'day').days) + 1;
  }

  styles(_: ScheduleLesson[]): any {
    return {};
  }
}
