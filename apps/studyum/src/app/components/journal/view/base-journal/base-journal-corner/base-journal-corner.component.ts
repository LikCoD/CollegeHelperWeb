import {Component, EventEmitter, Input, Output} from "@angular/core"
import {CollapseType} from "../base-journal.component"

@Component({
  selector: "app-base-journal-corner",
  templateUrl: "./base-journal-corner.component.html",
  styleUrls: ["./base-journal-corner.component.scss"]
})
export class BaseJournalCornerComponent {
  @Input() selectedCollapseType: CollapseType

  @Output() collapse = new EventEmitter<CollapseType>()

  select(value: string) {
    this.collapse.emit(value as CollapseType)
  }
}
