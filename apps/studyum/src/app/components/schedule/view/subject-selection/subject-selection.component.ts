import {Component, EventEmitter, Input, Output} from "@angular/core"
import {Lesson} from "../../../../models/schedule"

@Component({
  selector: 'app-subject-selection',
  templateUrl: './subject-selection.component.html',
  styleUrls: ['./subject-selection.component.scss']
})
export class SubjectSelectionComponent {
  @Input() lessons: Lesson[]
  @Output() select = new EventEmitter<Lesson>();
}
