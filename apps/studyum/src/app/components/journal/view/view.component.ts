import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {JournalService} from "../../../services/shared/journal/journal.service"
import {Journal} from "../../../models/journal"
import {Observable} from "rxjs"
import {SelectMarkComponent} from "../../standalones/popups/select-mark/select-mark.component"
import {JournalDisplayModeService} from "../../../services/shared/journal/journal-display-mode.service"

@Component({
  selector: "app-journal-login",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JournalViewComponent implements OnInit {
  isAmountSelected = false
  journal$: Observable<Journal[]>

  @ViewChild("selectMarkComponent") selectMarkEl?: SelectMarkComponent

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private journalService: JournalService,
    private modeService: JournalDisplayModeService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["group"] == undefined || params["subject"] == undefined || params["teacher"] == undefined) return

      this.journal$ = this.journalService.getJournal(params["group"], params["subject"], params["teacher"])
    })

    //TODO detectChanges
    this.modeService.standaloneType$.subscribe({next: type => {
        console.log(this.modeService.selectedStandaloneType)
        this.isAmountSelected = type !== null && !!type?.standaloneMarks
        this.cdr.reattach()
      }})
    this.modeService.mode$.subscribe({next: _ => this.cdr.reattach()})
  }

  toggleAmount() {
    this.isAmountSelected = !this.isAmountSelected
    this.cdr.reattach()
  }
}

