import {Component} from "@angular/core"
import {JournalInfo} from "../../../../../models/journal"
import {CollapseType, JournalCollapseService} from "../../../../../services/ui/journal-collapse.service"
import {JournalService} from "../../../../../services/shared/journal.service"
import {SettingsService} from "../../../../../services/ui/settings.service"

@Component({
  selector: "app-base-journal-top-action-bar",
  templateUrl: "./base-journal-top-action-bar.component.html",
  styleUrls: ["./base-journal-top-action-bar.component.scss"]
})
export class BaseJournalTopActionBarComponent {
  selectedCollapseType: CollapseType

  constructor(private service: JournalService, private collapseService: JournalCollapseService, private settingsService: SettingsService) {
    this.selectedCollapseType = this.settingsService.collapseType
    this.collapseService.change$.subscribe({
      next: _ => this.selectedCollapseType = "null"
    })
  }

  get journalInfo(): JournalInfo {
    return this.service.journal.info
  }

  selectCollapse(value: string) {
    this.collapseService.type = value as CollapseType
  }
}

