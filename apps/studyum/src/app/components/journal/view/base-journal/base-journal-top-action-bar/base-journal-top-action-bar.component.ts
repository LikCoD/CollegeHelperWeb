import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core"
import {JournalInfo} from "../../../../../models/journal"
import {CollapseType, JournalCollapseService} from "../../../../../services/shared/journal/journal-collapse.service"
import {JournalService} from "../../../../../services/shared/journal/journal.service"
import {SettingsService} from "../../../../../services/ui/settings.service"

@Component({
  selector: "app-base-journal-top-action-bar",
  templateUrl: "./base-journal-top-action-bar.component.html",
  styleUrls: ["./base-journal-top-action-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseJournalTopActionBarComponent implements OnInit {
  selectedCollapseType: CollapseType

  constructor(
    private service: JournalService,
    private collapseService: JournalCollapseService,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef
  ) {
  }

  get journalInfo(): JournalInfo {
    return this.service.journal.info
  }

  selectCollapse(value: string) {
    this.collapseService.type = value as CollapseType
  }

  ngOnInit(): void {
    this.selectedCollapseType = this.settingsService.collapseType
    this.collapseService.change$.subscribe({
      next: _ => {
        this.selectedCollapseType = "null"
        this.cdr.detectChanges()
      }
    })
  }
}

