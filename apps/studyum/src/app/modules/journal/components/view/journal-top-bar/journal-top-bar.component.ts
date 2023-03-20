import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core"
import {JournalInfo} from "../../../../../shared/models/journal"
import {CollapseType, JournalCollapseService} from "../../../services/journal-collapse.service"
import {JournalService} from "../../../services/journal.service"
import {SettingsService} from "../../../../../shared/services/ui/settings.service"

@Component({
  selector: "app-journal-top-bar",
  templateUrl: "./journal-top-bar.component.html",
  styleUrls: ["./journal-top-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalTopBarComponent implements OnInit {
  selectedCollapseType: CollapseType

  constructor(
    private service: JournalService,
    private collapseService: JournalCollapseService,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef
  ) {}

  get journalInfo(): JournalInfo {
    return this.service.journal.info
  }

  selectCollapse(value: string) {
    this.collapseService.type = value as CollapseType
  }

  ngOnInit(): void {
    this.selectedCollapseType = this.settingsService.collapseType
    this.collapseService.change$.subscribe({
      next: (_) => {
        this.selectedCollapseType = "null"
        this.cdr.detectChanges()
      },
    })
  }
}
