import {Component, OnInit, ViewChild} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {JournalService} from "../../../services/shared/journal/journal.service"
import {Journal} from "../../../models/journal"
import {Observable} from "rxjs"
import {SelectMarkComponent} from "../../standalones/popups/select-mark/select-mark.component"

@Component({
  selector: "app-login",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class JournalViewComponent implements OnInit {

  isAmountSelected = false
  journal$: Observable<Journal[]>

  @ViewChild("selectMarkComponent") selectMarkEl?: SelectMarkComponent

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private journalService: JournalService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["group"] == undefined || params["subject"] == undefined || params["teacher"] == undefined) return

      this.journal$ = this.journalService.getJournal(params["group"], params["subject"], params["teacher"])
    })
  }
}

