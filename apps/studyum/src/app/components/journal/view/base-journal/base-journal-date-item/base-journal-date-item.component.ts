import {Component, ElementRef, Input} from "@angular/core"
import {Lesson} from "../../../../../models/schedule"

@Component({
  selector: "app-base-journal-date-item",
  templateUrl: "./base-journal-date-item.component.html",
  styleUrls: ["./base-journal-date-item.component.scss"],
})
export class BaseJournalDateItemComponent {
  @Input() lesson: Lesson

  constructor(public elRef: ElementRef) {
  }
}
