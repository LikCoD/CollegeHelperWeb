import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService } from '../../../services/shared/journal.service';
import { Journal, Mark } from '../../../models/journal';
import { LessonType } from '../../../models/general';
import { Observable } from 'rxjs';
import { DataPoint, JournalPointData } from '../../../models/dto/points';
import { Lesson } from '../../../models/schedule';

@Component({
  selector: 'app-login',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class JournalViewComponent implements OnInit {

  isAbsencesSelected = false;
  selectedLessonType: string | null;

  journal$: Observable<Journal>

  selectedCell?: DataPoint<JournalPointData[]>

  isCtrlPressed = false;
  isShiftPressed = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public journalService: JournalService
  ) {
    this.journal$ = journalService.journal$
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

    this.selectedLessonType = type.type;
    this.journalService.selectStandaloneMark(type.type);
  }

  getMarks(journal: Journal, lesson: Lesson): string[] {
    let lessonType = journal.info.studyPlace.lessonTypes.find(value => value.type == lesson.type);
    if (lessonType == undefined) return [];

    if (this.selectedLessonType == null) return lessonType.marks.map(value => value.mark);
    else return lessonType.standaloneMarks.map(value => value.mark);
  }

  cellClick(point: DataPoint<JournalPointData[]>) {
    this.selectedCell = point
  }

  markAdd(mark: Mark) {
    this.selectedCell?.data.forEach(value => {
      let mark_ = {
        mark: mark.mark,
        lessonId: value.lesson.id,
        studentID: value.studentID,
        studyPlaceId: mark.studyPlaceID
      };

      this.journalService.addMark(mark_).subscribe({
        next: m => {
          if (value.lesson.marks == null)
            value.lesson.marks = [m];
          else
            value.lesson.marks?.push(m);
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
    let lesson = this.selectedCell?.data[0]?.lesson;
    if (lesson == undefined) return;

    this.journalService.deleteMark(id).subscribe({
      next: id => {
        lesson!!.marks = lesson!!.marks?.filter(value => value.id != id);
      }
    });
  }

}

