import {Component, EventEmitter, Output} from "@angular/core"

@Component({
  selector: "app-base-journal-corner",
  templateUrl: "./base-journal-corner.component.html",
  styleUrls: ["./base-journal-corner.component.scss"],
})
export class BaseJournalCornerComponent {
  @Output() collapse = new EventEmitter()
}
