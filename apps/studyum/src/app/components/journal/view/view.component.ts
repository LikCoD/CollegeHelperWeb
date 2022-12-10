import {Component, OnInit, ViewChild} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {JournalService} from "../../../services/shared/journal.service"
import {Journal} from "../../../models/journal"
import {JournalMode, LessonType} from "../../../models/general"
import {Observable} from "rxjs"
import {SelectMarkComponent} from "../../standalones/popups/select-mark/select-mark.component"
import {JournalCollapseService} from "../../../services/ui/journal-collapse.service"

@Component({
  selector: "app-login",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class JournalViewComponent implements OnInit {

  isAbsencesSelected = false
  isAmountSelected = false
  selectedLessonType: LessonType | null

  journal$: Observable<Journal[]>

  @ViewChild("selectMarkComponent") selectMarkEl?: SelectMarkComponent

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public journalService: JournalService,
    private collapseService: JournalCollapseService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["group"] == undefined || params["subject"] == undefined || params["teacher"] == undefined) return

      this.journal$ = this.journalService.getJournal(params["group"], params["subject"], params["teacher"])
    })
  }

  selectLessonType(journal: Journal, type: LessonType | null) {
    if (type == null || this.selectedLessonType == type) {
      this.selectedLessonType = null
      this.isAmountSelected = false
      //this.journalService.getGeneralJournal()
      return
    }

    this.isAbsencesSelected = false
    this.selectedLessonType = type

    this.isAmountSelected = !!journal.info.studyPlace.lessonTypes.find(v => v.type == type.type)?.standaloneMarks

    this.journalService.selectStandaloneType(type.type)
  }

  mode(): JournalMode {
    if (this.isAbsencesSelected) return "absences"
    if (this.selectedLessonType != null) return "standalone"
    return "general"
  }
}

