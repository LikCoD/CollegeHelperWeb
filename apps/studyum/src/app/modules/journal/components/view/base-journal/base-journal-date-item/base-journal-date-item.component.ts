import {ChangeDetectionStrategy, Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../shared/models/schedule"

@Component({
  selector: "app-base-journal-date-item",
  templateUrl: "./base-journal-date-item.component.html",
  styleUrls: ["./base-journal-date-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseJournalDateItemComponent {
  @Input() lesson: Lesson
}
