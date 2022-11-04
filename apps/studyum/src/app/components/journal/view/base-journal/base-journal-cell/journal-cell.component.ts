import {Component, HostBinding, Input} from "@angular/core"

@Component({
  selector: "app-base-journal-cell",
  templateUrl: "./journal-cell.component.html",
  styleUrls: ["./journal-cell.component.scss"]
})
export class JournalCellComponent {
  @Input() entries: string[]
  @Input() color: string

  @HostBinding("style.background") get bgColor() {
    return this.entries.length ? this.color : "#29363E"
  }
}
