import {Component, EventEmitter, Input, Output} from "@angular/core"
import {LessonType} from "../../../../models/general"
import {Journal} from "../../../../models/journal"

@Component({
  selector: "app-journal-bottom-action-bar",
  templateUrl: "./journal-bottom-action-bar.component.html",
  styleUrls: ["./journal-bottom-action-bar.component.scss"]
})
export class JournalBottomActionBarComponent {

  @Input() journal: Journal
  @Input() selectedType: LessonType | null
  @Input() isAbsencesSelected: boolean
  @Input() isShowAmount: boolean

  @Output() selectType = new EventEmitter<LessonType | null>()
  @Output() toggleAbsence = new EventEmitter()
  @Output() toggleAmount = new EventEmitter()

  getLessonTypes() {
    return this.journal.info.studyPlace.lessonTypes.map(type => {
      type.toString = () => type.type
      return type
    })
  }
}
