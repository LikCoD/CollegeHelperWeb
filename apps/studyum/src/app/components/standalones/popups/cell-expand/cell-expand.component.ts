import {Component, Input} from "@angular/core"

@Component({
  selector: "app-cell-expand",
  templateUrl: "./cell-expand.component.html",
  styleUrls: ["./cell-expand.component.scss"],
})
export class CellExpandComponent {
  @Input() entries: string[]
}
