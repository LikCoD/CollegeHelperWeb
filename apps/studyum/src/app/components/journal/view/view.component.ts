import {Component, HostListener, OnInit, ViewChild} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {JournalService} from "../../../services/shared/journal.service"
import {Journal, Mark} from "../../../models/journal"
import {JournalMode, LessonType} from "../../../models/general"
import {Observable} from "rxjs"
import {DataPoint, JournalPointData} from "../../../models/dto/points"
import {Lesson} from "../../../models/schedule"
import {ScheduleService} from "../../../services/shared/schedule.service"
import {SelectMarkComponent} from "../../standalones/popups/select-mark/select-mark.component"

@Component({
  selector: "app-login",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class JournalViewComponent implements OnInit {

  isAbsencesSelected = false
  selectedLessonType: LessonType | null

  journal$: Observable<Journal[]>

  selectedCell?: DataPoint<JournalPointData[]>
  selectedDate?: DataPoint<Lesson>

  isCtrlPressed = false
  isShiftPressed = false

  @ViewChild("selectMarkComponent") selectMarkEl?: SelectMarkComponent

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public journalService: JournalService,
    public scheduleService: ScheduleService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["group"] == undefined || params["subject"] == undefined || params["teacher"] == undefined) return

      this.journal$ = this.journalService.getJournal(params["group"], params["subject"], params["teacher"])
    })
  }

  @HostListener("document:keydown", ["$event"])
  keyDown(event: KeyboardEvent) {
    if (event.key == "Control") this.isCtrlPressed = true
    if (event.key == "Shift") this.isShiftPressed = true
  }

  @HostListener("document:keyup", ["$event"])
  keyUp(event: KeyboardEvent) {
    if (event.key == "Control") this.isCtrlPressed = false
    if (event.key == "Shift") this.isShiftPressed = false
  }

  selectLessonType(journal: Journal, type: LessonType | null) {
    if (type == null || this.selectedLessonType == type) {
      this.selectedLessonType = null
      this.journalService.getGeneralJournal()
      return
    }

    this.isAbsencesSelected = false
    this.selectedLessonType = type

    this.journalService.selectStandaloneType(journal, type.type)
  }

  getStandaloneMarks(journal: Journal, lesson: Lesson): string[] | undefined {
    let lessonType = journal.info.studyPlace.lessonTypes.find(value => value.type == lesson.type)
    if (lessonType == undefined) return []

    return lessonType.standaloneMarks?.map(value => value.mark)
  }

  getMarks(journal: Journal, lesson: Lesson): string[] {
    let lessonType = journal.info.studyPlace.lessonTypes.find(value => value.type == lesson.type)
    if (lessonType == undefined) return []

    if (this.selectedLessonType == null) return lessonType.marks.map(value => value.mark)
    else return lessonType.standaloneMarks?.map(value => value.mark) ?? lessonType.marks.map(value => value.mark)
  }

  cellClick(point: DataPoint<JournalPointData[]>) {
    this.selectedDate = undefined
    this.selectedCell = point

    this.selectMarkEl?.focusInput()
  }

  dateClick(point: DataPoint<Lesson>) {
    this.selectedDate = point
    this.selectedCell = undefined
  }

  markAdd(journal: Journal, mark: Mark) {
    this.selectedCell?.data.forEach(value => {
      let mark_ = {
        mark: mark.mark,
        lessonId: value.lesson.id,
        studentID: value.studentID,
        studyPlaceId: mark.studyPlaceID
      }

      this.journalService.addMark(journal.info.studyPlace, value.lesson, mark_)
    })
  }

  markEdit(journal: Journal, mark: Mark) {
    let lesson = this.selectedCell?.data[0]?.lesson
    if (lesson == undefined) return

    this.journalService.editMark(journal.info.studyPlace, lesson, mark)
  }

  markDelete(journal: Journal, id: string) {
    let lesson = this.selectedCell?.data[0]?.lesson
    if (lesson == undefined) return

    this.journalService.deleteMark(journal.info.studyPlace, lesson, id)
  }

  typesString(journal: Journal) {
    return journal.info.studyPlace.lessonTypes.map(value => value.type)
  }

  setAbsence(lesson: Lesson, id: string, minutes: number | null) {
    this.journalService.setAbsence(lesson, id, minutes).subscribe({
      next: absence => lesson.absences = [absence]
    })
  }

  removeAbsence(lesson: Lesson, id: string) {
    this.journalService.removeAbsence(id).subscribe({
      next: _ => lesson.absences = []
    })
  }

  updateAbsence(lesson: Lesson, id: string, minutes: number | null) {
    this.journalService.updateAbsence(lesson, id, minutes).subscribe({
      next: absence => lesson.absences = [absence]
    })
  }

  truncateCell(journal: Journal) {
    this.selectedCell?.data.forEach(value => {
      value.lesson.marks?.forEach(v => this.journalService.deleteMark(journal.info.studyPlace, value.lesson, v.id ?? ""))
    })

    this.selectedCell = undefined
  }

  updateLesson(journal: Journal, lesson: Lesson) {
    this.scheduleService.updateLesson(lesson).subscribe({
      next: lesson => {
        let columnIndex = journal.dates.findIndex(value => value.id == lesson.id)
        journal.dates[columnIndex] = lesson
        journal.rows.forEach(value => {
          value.lessons[columnIndex] = {
            ...lesson,
            journalCellColor: value.lessons[columnIndex].journalCellColor,
            marks: value.lessons[columnIndex].marks,
            absences: value.lessons[columnIndex].absences
          }
        })
      }
    })
  }

  mode(): JournalMode {
    if (this.isAbsencesSelected) return "absences"
    if (this.selectedLessonType != null) return "standalone"
    return "general"
  }
}

