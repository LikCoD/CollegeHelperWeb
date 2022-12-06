import {Component, ElementRef, EventEmitter, Host, HostListener, Input, OnInit, Output, ViewChild} from "@angular/core"
import {Lesson} from "../../../../models/schedule"
import {Journal, JournalRow, MarkAmount} from "../../../../models/journal"
import {JournalService} from "../../../../services/shared/journal.service"
import {DataPoint, JournalPointData} from "../../../../models/dto/points"
import {JournalMode, LessonType} from "../../../../models/general"
import {defaultLocale} from "../../../../app.component"
import {JournalCellService} from "../../../../services/ui/journal.cell.service"

@Component({
  selector: "app-base-journal",
  templateUrl: "./base-journal.component.html",
  styleUrls: ["./base-journal.component.scss"]
})
export class BaseJournalComponent implements OnInit {

  @Input() mode: JournalMode
  @Input() journal: Journal

  @Output() dateClick = new EventEmitter<DataPoint<Lesson>>()
  @Output() cellClick = new EventEmitter<DataPoint<JournalPointData[]>>()

  @Output() collapseChange = new EventEmitter<null>()

  @ViewChild("table") table: ElementRef

  focusedCells: DataPoint<JournalPointData>[] = []
  isCtrlPressed = false
  isShiftPressed = false
  collapseType: CollapseType = "smart"

  @Input()
  showAmount = false

  @Input()
  selectedLessonType: LessonType | null = null

  constructor(@Host() private host: ElementRef, public journalService: JournalService, private cellService: JournalCellService) {
  }

  @Input() set selectedCollapseType(value: CollapseType) {
    //this.toggleCollapse(value)
  }

  @HostListener("document:keyup.shift", ["false", "'shift'"])
  @HostListener("document:keyup.control", ["false", "'control'"])
  @HostListener("document:keyup.meta", ["false", "'control'"])
  @HostListener("document:keydown.shift", ["true", "'shift'"])
  @HostListener("document:keydown.control", ["true", "'control'"])
  @HostListener("document:keydown.meta", ["true", "'control'"])
  keyEvent(down: boolean, key: string) {
    if (key == "shift") this.cellService.isShiftPressed = down
    if (key == "control") this.cellService.isControlPressed = down
  }

  @HostListener("document:keydown.arrowUp", ["0", "-1"])
  @HostListener("document:keydown.arrowRight", ["1", "0"])
  @HostListener("document:keydown.arrowDown", ["0", "1"])
  @HostListener("document:keydown.arrowLeft", ["-1", "0"])
  arrowEvent(x: number, y: number) {
    this.cellService.moveBy(x, y)
  }

  onDateClick(cell: ElementRef, journal: Journal, date: Lesson) {
    this.focusedCells = []

    if (date.collapsedType != undefined) {
      this.collapseType = "null"
      //this.journalService.collapse(journal, date, date.collapsedType)

      this.collapseChange.emit()

      return
    }

    if (this.isCtrlPressed) {
      this.collapseType = "null"
      //this.journalService.collapse(journal, date, "day")

      this.collapseChange.emit()

      return
    }
    if (this.isShiftPressed) {
      this.collapseType = "null"
      //this.journalService.collapse(journal, date, "month")

      this.collapseChange.emit()

      return
    }

    this.dateClick.emit({x: cell.nativeElement.offsetLeft, y: cell.nativeElement.offsetTop, data: date})
  }

  //
  // smartCollapse() {
  //   let monthLessons: Lesson[] = []
  //   let dayLessons: Lesson[] = []
  //
  //   let today = moment.utc()
  //   let lastDate: moment.Moment | undefined = undefined
  //   this.journal.dates.forEach(value => {
  //     if ((lastDate == undefined || compareDates(lastDate, value.startDate, "month")) && !compareDates(today, value.startDate, "month")) {
  //       monthLessons.push(value)
  //     } else if (lastDate == undefined || compareDates(lastDate, value.startDate, "day") && !compareDates(today, value.startDate, "day")) {
  //       dayLessons.push(value)
  //     }
  //
  //     lastDate = value.startDate
  //   })
  //
  //   monthLessons.forEach(l => {
  //     this.journalService.collapse(this.journal, l, "month")
  //   })
  //
  //   dayLessons.forEach(l => {
  //     this.journalService.collapse(this.journal, l, "day")
  //   })
  // }
  //
  // toggleCollapse(type: CollapseType) {
  //   this.focusedCells = []
  //   this.journalService.expand(this.journal)
  //
  //   this.collapseType = type
  //   if (this.collapseType == "null" || this.collapseType == "expanded") return
  //
  //   if (this.collapseType == "smart") {
  //     this.smartCollapse()
  //     return
  //   }
  //
  //   let lastDate: moment.Moment | undefined = undefined
  //   let lessons: Lesson[] = []
  //   this.journal.dates.forEach(value => {
  //     if ((lastDate != undefined && compareDates(lastDate, value.startDate, this.collapseType as moment.unitOfTime.StartOf)) || value.collapsedType != undefined) {
  //       return
  //     }
  //
  //     lastDate = value.startDate
  //     lessons.push(value)
  //   })
  //
  //   lessons.forEach(l => {
  //     this.journalService.collapse(this.journal, l, this.collapseType as moment.unitOfTime.StartOf)
  //   })
  // }

  filterLessons(lessons: Lesson[][][], dates = lessons): Lesson[] {
    return lessons.flat(2)
  }

  unselectCells() {
    this.focusedCells = []
  }


  cellEntities(lesson: Lesson): string[] {
    let type = this.journal.info.studyPlace.lessonTypes.find(v => v.type == lesson.type)

    let marks = lesson.marks
      ?.filter(v => this.mode == "general" || (this.mode == "standalone" && type?.standaloneMarks?.find(t => t.mark == v.mark)))
      ?.map(value => value.mark) ?? []

    if (this.mode == "standalone") return marks

    let absences = lesson.absences?.filter(v => this.mode == "absences" || !v.time)
      ?.map(value => value.time ?? this.journal.info.studyPlace.absenceMark) ?? []

    return marks.concat(absences)
  }

  getAverage(row: JournalRow): string {
    if (row.numericMarksAmount == 0) return "-"

    let locale = localStorage.getItem("locale") ?? defaultLocale
    return (row.numericMarksSum / row.numericMarksAmount).toLocaleString(locale, {minimumFractionDigits: 2})
  }

  ngOnInit(): void {
    //this.smartCollapse()
  }

  marksAmount(row: JournalRow): MarkAmount[] {
    let type = this.journal.info.studyPlace.lessonTypes
      .find(t => t.type == this.selectedLessonType?.type)

    let marks = type?.standaloneMarks ? type.standaloneMarks : type?.marks ?? []

    return row.marksAmount.filter(v =>
      this.mode == "general" ||
      !!marks.find(m => m.mark == v.mark)
    )
  }

  monthLessons(journal: Journal, i: number): Lesson[][][] {
    return journal.rows.map(r => r.lessons[i])
  }
}

export type CollapseType = ("month" | "day" | "smart" | "expanded" | "null")
