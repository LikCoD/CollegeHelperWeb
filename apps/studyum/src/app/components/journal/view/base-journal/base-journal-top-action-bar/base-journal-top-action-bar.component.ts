import {Component, EventEmitter, Input, Output} from "@angular/core"
import {JournalInfo} from "../../../../../models/journal"
import {CollapseType} from "../../../../../services/ui/journal-collapse.service"

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

