import {Component, Input} from "@angular/core"

@Component({
  selector: "app-base-journal-cell",
  templateUrl: "./journal-cell.component.html",
  styleUrls: ["./journal-cell.component.scss"]
})
export class JournalCellComponent {
  @Input() entries: Entry[]
  @Input() color: string
}

export interface Entry {
  title: string;
  studentID: string;
  lessonID: string;
  studyPlaceID: string;
  id?: string;
}
