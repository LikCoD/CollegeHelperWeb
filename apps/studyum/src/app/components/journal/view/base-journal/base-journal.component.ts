import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Lesson } from '../../../../models/schedule';
import { Journal, Mark } from '../../../../models/journal';
import * as moment from 'moment';
import { compareDates } from '../../../../utils';
import { JournalService } from '../../../../services/shared/journal.service';
import { ScheduleService } from '../../../../services/shared/schedule.service';
import { DataPoint, JournalPointData } from '../../../../models/dto/points';

@Component({
  selector: 'app-base-journal',
  templateUrl: './base-journal.component.html',
  styleUrls: ['./base-journal.component.scss']
})
export class BaseJournalComponent implements OnInit {

  @Input() journal: Journal;

  @Output() dateClick = new EventEmitter<DataPoint<Lesson>>();
  @Output() cellClick = new EventEmitter<DataPoint<JournalPointData[]>>();

  @ViewChild('table') table: ElementRef;

  focusedCells: DataPoint<JournalPointData>[] = [];
  isCtrlPressed = false;
  isShiftPressed = false;
  selectedDate: Lesson | null;
  collapseType?: moment.unitOfTime.StartOf;

  constructor(
    @Host() private host: ElementRef,
    public journalService: JournalService,
    public scheduleService: ScheduleService
  ) {
  }

  ngOnInit(): void {
  }

  focusCell(x: number, y: number) {
    let table = <HTMLTableElement>this.table.nativeElement;

    if (this.focusedCells.length == 0) {
      table.tBodies[0].rows[0].cells[0].focus();
      return;
    }

    let cell = table.tBodies[0].rows[y + this.focusedCells[0].y]?.cells[x + this.focusedCells[0].x];
    cell?.focus();
  }

  isFocused(x: number, y: number): boolean {
    return this.focusedCells.find(value => value.x == x && value.y == y) != undefined;
  }

  addFocusedPoint(point: DataPoint<JournalPointData>) {
    if (!this.isFocused(point.x, point.y)) this.focusedCells.push(point);
    else this.focusedCells = this.focusedCells.filter(value => value.x != point.x || value.y != point.y);
  }

  focus(cell: HTMLTableCellElement, x: number, y: number, lesson: Lesson, studentID: string, journal: Journal) {
    let cellX = cell.getClientRects()[0].x;
    let cellY = cell.getClientRects()[0].y;
    this.host.nativeElement.scrollBy(cellX < 180 ? cellX - 180 : 0, cellY < 120 ? cellY - 120 : 0);

    if (journal.info.editable && this.isShiftPressed && this.focusedCells.length > 0) {
      let previousPoint = this.focusedCells[this.focusedCells.length - 1];
      this.addFocusedPoint(previousPoint);

      let ex = x;
      let ey = y;
      let sx = previousPoint.x;
      let sy = previousPoint.y;

      if (sx > ex) ex--;
      else ex++;

      if (sy > ey) ey--;
      else ey++;

      for (let x1 = sx; x1 != ex; ex > x1 ? x1++ : x1--) {
        for (let y1 = sy; y1 != ey; ey > y1 ? y1++ : y1--) {
          let row = journal.rows[y1];
          let lesson = row.lessons[x1];

          if (this.isFocused(x, y) == this.isFocused(x1, y1))
            this.addFocusedPoint({ x: x1, y: y1, data: { lesson: lesson, studentID: row.id } });
        }
      }

      this.cellClick.emit({ x: cell.offsetLeft, y: cell.offsetTop, data: this.focusedCells.map(v => v.data) });
      return;
    }

    if (journal.info.editable && this.isCtrlPressed) {
      this.addFocusedPoint({ x: x, y: y, data: { lesson: lesson, studentID: studentID } });
      this.cellClick.emit({ x: cell.offsetLeft, y: cell.offsetTop, data: this.focusedCells.map(v => v.data) });
      return;
    }

    this.focusedCells = [{ x: x, y: y, data: { lesson: lesson, studentID: studentID } }];
    this.cellClick.emit({ x: cell.offsetLeft, y: cell.offsetTop, data: this.focusedCells.map(v => v.data) });
  }

  markAdd(mark: Mark) {
    this.focusedCells.forEach(value => {
      let mark_ = {
        mark: mark.mark,
        lessonId: value.data.lesson.id,
        studentID: value.data.studentID,
        studyPlaceId: mark.studyPlaceID
      };

      this.journalService.addMark(mark_).subscribe({
        next: m => {
          if (value.data.lesson.marks == null)
            value.data.lesson.marks = [m];
          else
            value.data.lesson.marks.push(m);
        }
      });
    });
  }

  markEdit(mark: Mark) {
    this.journalService.editMark(mark).subscribe({
      next: m => {
        mark.mark = m.mark;
      }
    });
  }

  markDelete(id: string) {
    let lesson = this.focusedCells[0]?.data?.lesson;
    if (lesson == undefined) return;

    this.journalService.deleteMark(id).subscribe({
      next: id => {
        lesson!!.marks = lesson!!.marks?.filter(value => value.id != id);
      }
    });
  }

  closeMarkPopup() {
    let focusedCell = this.focusedCells[this.focusedCells.length - 1];
    this.focusCell(focusedCell.x, focusedCell.y);

    this.focusedCells = [];
  }

  hideMarkPopup() {
    let focusedCell = this.focusedCells[this.focusedCells.length - 1];
    this.focusCell(focusedCell.x, focusedCell.y);

    this.focusedCells = [focusedCell];
  }

  @HostListener('document:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.key == 'Control') this.isCtrlPressed = true;
    if (event.key == 'Shift') this.isShiftPressed = true;
  }

  @HostListener('document:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (event.key == 'Control') this.isCtrlPressed = false;
    if (event.key == 'Shift') this.isShiftPressed = false;
  }

  onDateClick(cell: HTMLDivElement, journal: Journal, date: Lesson) {
    this.focusedCells = [];

    if (date.collapsedType != undefined) {
      this.collapseType = undefined;

      this.journalService.collapse(journal, date, date.collapsedType);
      return;
    }

    if (this.isCtrlPressed) {
      this.collapseType = undefined;
      this.journalService.collapse(journal, date, 'day');
      return;
    }
    if (this.isShiftPressed) {
      this.collapseType = undefined;
      this.journalService.collapse(journal, date, 'month');
      return;
    }

    let rect = cell.getBoundingClientRect();
    this.dateClick.emit({ x: rect.x, y: rect.y, data: date });
  }

  toggleCollapse(journal: Journal) {
    this.focusedCells = [];
    this.journalService.expand(journal);

    switch (this.collapseType) {
      case undefined:
        this.collapseType = 'day';
        break;
      case 'day':
        this.collapseType = 'month';
        break;
      case 'month':
        this.collapseType = undefined;
    }

    if (this.collapseType == undefined) return;

    let lastDate: moment.Moment | undefined = undefined;
    let lessons: Lesson[] = [];
    journal.dates.forEach(value => {
      if ((lastDate != undefined && compareDates(lastDate, value.startDate, this.collapseType!!)) || value.collapsedType != undefined) return;

      lastDate = value.startDate;
      lessons.push(value);
    });

    lessons.forEach(l => {
      this.journalService.collapse(journal, l, this.collapseType!!);
    });
  }

  filterCollapsed(lessons: Lesson[], dates = lessons): Lesson[] {
    return lessons.filter((_, i) => !dates[i].collapsed);
  }

  /*  typesString(journal: Journal) {
      return journal.info.studyPlace.lessonTypes.map(value => value.type);
    }

    closeDatePopup(journal: Journal, lesson: Lesson | null) {
      if (lesson == null) {
        this.selectedDate = null;
        return;
      }

      this.scheduleService.updateLesson(lesson).subscribe({
        next: lesson => {
          let columnIndex = journal.dates.findIndex(value => value.id == lesson.id);
          journal.rows.forEach(value => {
            value.lessons[columnIndex] = lesson;
          });
        }
      });
    }

    setAbsent(lesson: Lesson, id: string, minutes: number | null) {
      this.journalService.setAbsent(lesson, id, minutes).subscribe({
        next: mark => lesson.marks?.push(mark)
      });
    }

    removeAbsent(lesson: Lesson, id: string) {
      this.journalService.removeAbsent(id).subscribe({
        next: _ => lesson.marks = []
      });
    }

    updateAbsent(lesson: Lesson, id: string, minutes: number | null) {
      this.journalService.updateAbsent(lesson, id, minutes).subscribe({
        next: mark => lesson.marks = [mark]
      });
    }*/
}
