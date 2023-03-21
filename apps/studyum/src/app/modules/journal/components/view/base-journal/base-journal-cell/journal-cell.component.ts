import {ChangeDetectionStrategy, Component, Input} from "@angular/core"
import {TextDirective} from "../../../../../../../../../../libs/common/auto-color/src/lib/text.directive"

@Component({
  selector: "app-base-journal-cell",
  templateUrl: "./journal-cell.component.html",
  styleUrls: ["./journal-cell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{directive: TextDirective, inputs: ["background: color"]}],
})
export class JournalCellComponent {
  @Input() entries: Entry[]
  @Input() showPopup: boolean = true
  @Input() color: string
}

export interface Entry {
  text: string
  color: string
}
