import {Injectable} from '@angular/core';
import {JournalHttpService} from '../http/journal-http.service';
import {Observable, Subject, tap} from 'rxjs';
import {Journal, JournalOption, JournalRow, Mark} from '../../models/journal';
import {Lesson} from '../../models/schedule';
import * as moment from 'moment';
import {compareDates} from '../../utils';
import {JournalColors, LessonType, StudyPlace} from "../../models/general";

@Injectable({providedIn: 'root'})
export class JournalService {
  journal$ = new Subject<Journal>();
  options$: Observable<JournalOption[]>;

  journal: Journal;

  constructor(private httpService: JournalHttpService) {
  }

  getJournal(group: string, subject: string, teacher: string): Observable<Journal> {
    this.httpService.getJournal(group, subject, teacher).pipe(
      tap(j => this.journal = j)).subscribe({
      next: value => this.journal$.next(value)
    });
    return this.journal$;
  }

  getAbsentJournal(group: string, subject: string, teacher: string) {
    this.httpService.getAbsentJournal(group, subject, teacher).subscribe({
      next: value => this.journal$.next(value)
    });
  }

  getOptions(): Observable<JournalOption[]> {
    this.options$ = this.httpService.getOptions();
    return this.options$;
  }

  getCellColor(colors: JournalColors, types: LessonType[], lessonType: string, date: moment.Moment, marks: Mark[]): string {
    let color = colors.general
    for (let mark of marks) {
      let type = types.find(v => v.type === lessonType);
      if (type === undefined) return color = colors.general;

      let markType = type.marks.find(m => m.mark === mark.mark);
      if (markType === undefined || markType.workOutTime === 0) return colors.general;

      color = date.clone().add(markType.workOutTime, "second") > moment.utc() ? colors.warning : colors.danger;
    }

    return color
  }

  addMark(studyPlace: StudyPlace, lesson: Lesson, mark: Mark) {
    return this.httpService.addMark(mark).subscribe({
      next: value => {
        if (lesson.marks == undefined)
          lesson.marks = []

        lesson.marks.push(value)

        lesson.journalCellColor = this.getCellColor(studyPlace.journalColors, studyPlace.lessonTypes, lesson.type ?? "", lesson.startDate, lesson.marks)
      }
    });
  }

  editMark(studyPlace: StudyPlace, lesson: Lesson, mark: Mark) {
    this.httpService.editMark(mark).subscribe({
      next: value => {
        lesson.marks!![lesson!!.marks?.findIndex(v => v.id == value.id)!!] = value

        lesson.journalCellColor = this.getCellColor(studyPlace.journalColors, studyPlace.lessonTypes, lesson.type ?? "", lesson.startDate, lesson.marks!!)
      }
    });
  }

  deleteMark(studyPlace: StudyPlace, lesson: Lesson, id: string) {
    this.httpService.deleteMark(id).subscribe({
      next: value => {
        lesson.marks = lesson.marks?.filter(v => v.id !== value)

        lesson.journalCellColor = this.getCellColor(studyPlace.journalColors, studyPlace.lessonTypes, lesson.type ?? "", lesson.startDate, lesson.marks!!)
      }
    });
  }

  collapse(journal: Journal, lesson: Lesson, unit: moment.unitOfTime.StartOf) {
    let addNew = true;
    let collapse = lesson.collapsedType;

    if (collapse != undefined && unit == 'day' && collapse == 'month') unit = 'month';

    let indexes: number[] = [];
    journal.dates.forEach((value, index) => {
      if (!compareDates(value.startDate, lesson.startDate, unit)) return;

      if (value.collapsedType == unit) addNew = false;

      indexes.push(index);
      value.collapsed = (collapse == undefined && value.collapsedType != unit) || (collapse != undefined && value.collapsedType != undefined);
    });

    if (collapse != undefined) {
      journal.dates.splice(indexes[0], 1);
      journal.rows.forEach(row => row.lessons.splice(indexes[0], 1));
      return;
    }

    if (!addNew) return;

    journal.dates.splice(indexes[0], 0, {...lesson, collapsed: false, collapsedType: unit});

    journal.rows.forEach(row => {
      let collapsedLesson = <Lesson>{
        ...row.lessons[indexes[0]],
        marks: []
      };

      collapsedLesson.marks = indexes.flatMap(i => {
        if (row.lessons[i].marks == undefined || row.lessons[i].marks!!.length < 1) return [];
        return row.lessons[i].marks!!;
      })

      row.lessons.splice(indexes[0], 0, collapsedLesson);
    });
  }

  expand(journal: Journal) {
    let indexes: number[] = [];
    journal.dates.forEach((value, index) => {
      value.collapsed = value.collapsedType != undefined;
      if (value.collapsed) indexes.push(index);
    });

    indexes.forEach((i, amount) => {
      journal.dates.splice(i - amount, 1);
      journal.rows.forEach(v => v.lessons.splice(i - amount, 1));
    });
  }

  selectStandaloneType(type: string) {
    let sJournal = <Journal>{
      dates: [],
      rows: this.journal.rows.map(r => <JournalRow>{...r, lessons: []}),
      info: this.journal.info
    };
    let lessonType = this.journal.info.studyPlace.lessonTypes.find(v => v.type == type)!!

    this.journal.dates.forEach((value, i) => {
      if (value.type != type) return;

      sJournal.dates.push(value);
      sJournal.rows.forEach((r, ri) => {
        let lesson = {...this.journal.rows[ri].lessons[i]};
        lesson.marks = lesson.marks!!.filter(value => lessonType.standaloneMarks?.find(v => v.mark == value.mark) ?? false)

        r.lessons.push(lesson)
      });
    });

    this.journal$.next(sJournal);
  }

  getGeneralJournal() {
    this.journal$.next(this.journal);
  }

  setAbsent(lesson: Lesson, id: string, time: number | null) {
    return this.httpService.setAbsent(
      {lessonID: lesson.id, studentID: id, time: time},
      this.journal.info.studyPlace.absentMark
    );
  }

  removeAbsent(id: string) {
    return this.httpService.removeAbsent(id);
  }

  updateAbsent(lesson: Lesson, id: string, time: number | null) {
    return this.httpService.updateAbsent(
      {id: lesson.marks!![0].id, lessonID: lesson.id, studentID: id, time: time},
      this.journal.info.studyPlace.absentMark
    );
  }
}
