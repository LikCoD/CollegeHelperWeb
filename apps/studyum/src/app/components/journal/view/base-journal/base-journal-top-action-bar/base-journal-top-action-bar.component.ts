import {Component, EventEmitter, Input, Output} from "@angular/core"
import {CollapseType} from "../base-journal.component"
import {JournalInfo} from "../../../../../models/journal"

@Component({
  selector: "app-base-journal-top-action-bar",
  templateUrl: "./base-journal-top-action-bar.component.html",
  styleUrls: ["./base-journal-top-action-bar.component.scss"],
})
export class BaseJournalTopActionBarComponent {
  @Input() selectedCollapseType: CollapseType
  @Input() journalInfo: JournalInfo
  @Output() collapse = new EventEmitter<CollapseType>()

  selectCollapse(value: string) {
    this.collapse.emit(value as CollapseType)
  }
}

