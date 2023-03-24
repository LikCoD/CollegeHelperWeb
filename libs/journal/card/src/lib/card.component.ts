import {ChangeDetectionStrategy, Component, Input} from "@angular/core"
import {JournalOption} from "../../../../../apps/studyum/src/app/shared/models/journal"
import {Params} from "@angular/router"

@Component({
  selector: "jrnl-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() option: JournalOption

  buildParams = () =>
    <Params>{
      group: this.option.group,
      teacher: this.option.teacher,
      subject: this.option.subject,
    }
}
