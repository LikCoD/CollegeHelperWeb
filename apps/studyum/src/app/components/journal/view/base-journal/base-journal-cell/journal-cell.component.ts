import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core"

@Component({
  selector: "app-base-journal-cell",
  templateUrl: "./journal-cell.component.html",
  styleUrls: ["./journal-cell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JournalCellComponent {
  @Input() entries: Entry[]
  @HostBinding("style.background") @Input() color: string
  @Input() showPopup: boolean = true
}

export interface Entry {
  text: string
  color: string
}
