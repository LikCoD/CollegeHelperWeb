import {Component, Input} from "@angular/core"
import {Entry} from "../../../journal/view/base-journal/base-journal-cell/journal-cell.component"

@Component({
  selector: "app-cell-expand",
  templateUrl: "./cell-expand.component.html",
  styleUrls: ["./cell-expand.component.scss"],
})
export class CellExpandComponent {
  @Input() entries: Entry[]
}
