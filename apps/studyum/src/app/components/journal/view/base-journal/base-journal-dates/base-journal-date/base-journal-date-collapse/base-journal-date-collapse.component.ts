import {Component, Input} from "@angular/core"

@Component({
  selector: "app-base-journal-date-collapse",
  templateUrl: "./base-journal-date-collapse.component.html",
  styleUrls: ["./base-journal-date-collapse.component.scss"],
})
export class BaseJournalDateCollapseComponent {
  @Input() date: string
  @Input() amount: number
}
