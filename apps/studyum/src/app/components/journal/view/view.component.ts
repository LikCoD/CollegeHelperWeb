import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService } from '../../../services/shared/journal.service';
import { Journal, Mark } from '../../../models/journal';
import { LessonType } from '../../../models/general';
import { Observable } from 'rxjs';
import { DataPoint, JournalPointData } from '../../../models/dto/points';
import { Lesson } from '../../../models/schedule';
import { ScheduleService } from "../../../services/shared/schedule.service"
import { SelectMarkComponent } from "../../standalones/popups/select-mark/select-mark.component"

@Component({
  selector: 'app-login',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class JournalViewComponent implements OnInit {

  isAbsencesSelected = false;
  selectedLessonType: string | null;

  journal$: Observable<Journal[]>;

  selectedCell?: DataPoint<JournalPointData[]>;
  selectedDate?: DataPoint<Lesson>;

  isCtrlPressed = false;
  isShiftPressed = false;

  @ViewChild('selectMarkComponent') selectMarkEl?: SelectMarkComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public journalService: JournalService,
    public scheduleService: ScheduleService
  ) {
    this.journal$ = journalService.journal$;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['group'] == undefined || params['subject'] == undefined || params['teacher'] == undefined) return;

      this.journalService.getJournal(params['group'], params['subject'], params['teacher']);
    });
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

  getAbsentJournal() {
    if (this.isAbsencesSelected) {
      this.isAbsencesSelected = false;
      this.journalService.getGeneralJournal();
      return;
    }

    this.selectedLessonType = null;
    this.isAbsencesSelected = true;

    let params = this.router.parseUrl(this.router.url).queryParams;
    if (params['group'] == undefined || params['subject'] == undefined || params['teacher'] == undefined) return;

    this.journalService.getAbsentJournal(params['group'], params['subject'], params['teacher']);
  }

  selectLessonType(journal: Journal, type: LessonType) {
    if (this.selectedLessonType == type.type) {
      this.selectedLessonType = null;
      this.journalService.getGeneralJournal();
      return;
    }

    this.isAbsencesSelected = false;
    this.selectedLessonType = type.type;

    this.journalService.selectStandaloneType(type.type);
  }

  getStandaloneMarks(journal: Journal, lesson: Lesson): string[] | undefined {
    let lessonType = journal.info.studyPlace.lessonTypes.find(value => value.type == lesson.type);
    if (lessonType == undefined) return [];

    return lessonType.standaloneMarks?.map(value => value.mark);
  }

  getMarks(journal: Journal, lesson: Lesson): string[] {
    let lessonType = journal.info.studyPlace.lessonTypes.find(value => value.type == lesson.type);
    if (lessonType == undefined) return [];

    if (this.selectedLessonType == null) return lessonType.marks.map(value => value.mark);
    else return lessonType.standaloneMarks?.map(value => value.mark) ?? lessonType.marks.map(value => value.mark);
  }

  cellClick(point: DataPoint<JournalPointData[]>) {
    this.selectedDate = undefined;
    this.selectedCell = point;

    this.selectMarkEl?.focusInput();
  }

  dateClick(point: DataPoint<Lesson>) {
    this.selectedDate = point;
    this.selectedCell = undefined;
  }

  markAdd(journal: Journal, mark: Mark) {
    this.selectedCell?.data.forEach(value => {
      let mark_ = {
        mark: mark.mark,
        lessonId: value.lesson.id,
        studentID: value.studentID,
        studyPlaceId: mark.studyPlaceID
      };

      this.journalService.addMark(journal.info.studyPlace, value.lesson, mark_);
    });
  }

  markEdit(journal: Journal, mark: Mark) {
    let lesson = this.selectedCell?.data[0]?.lesson;
    if (lesson == undefined) return;

    this.journalService.editMark(journal.info.studyPlace, lesson, mark);
  }

  markDelete(journal: Journal, id: string) {
    let lesson = this.selectedCell?.data[0]?.lesson;
    if (lesson == undefined) return;

    this.journalService.deleteMark(journal.info.studyPlace, lesson, id);
  }

  typesString(journal: Journal) {
    return journal.info.studyPlace.lessonTypes.map(value => value.type);
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
  }

  closeDatePopup(journal: Journal, lesson: Lesson | null) {
    if (this.selectedDate == undefined || lesson == null) {
      this.selectedDate = undefined;
      return;
    }

    this.scheduleService.updateLesson(lesson).subscribe({
      next: lesson => {
        let columnIndex = journal.dates.findIndex(value => value.id == lesson.id);
        journal.dates[columnIndex].type = lesson.type;
        journal.rows.forEach(value => {
          value.lessons[columnIndex] = lesson;
        });
      }
    });

    this.selectedDate = undefined;
  }

  truncateCell(journal: Journal) {
    this.selectedCell?.data.forEach(value => {
      value.lesson.marks?.forEach(v => this.journalService.deleteMark(journal.info.studyPlace, value.lesson, v.id ?? ''));
    });

    this.selectedCell = undefined;
  }
}

