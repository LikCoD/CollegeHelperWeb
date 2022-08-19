import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../../app.component";
import {JournalCellComponent} from "./cell/journal-cell.component";
import {Lesson} from "../../../models";
import {JournalService} from "../../../services/shared/journal.service";
import {GroupMember} from "../../../data";

@Component({
  selector: 'app-login',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class JournalViewComponent implements OnInit {
  lessons: Lesson[] = []
  groupMembers: GroupMember[] = []

  lessonTypes: string[] = ["Laboratory", "Practice", "General"]

  selectedCell: JournalCellComponent | undefined

  constructor(private router: Router, private http: HttpClient, private parent: AppComponent, private route: ActivatedRoute, public journalService: JournalService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["group"] == undefined || params["subject"] == undefined || params["teacher"] == undefined) return

      this.journalService.getJournal(params["group"],  params["subject"], params["teacher"])
    })
  }

  focusCell(x: number, y: number) {
    this.hidePopup()

    let table = <HTMLTableElement>document.getElementById("mainTable")
    let cell = table.rows[y]?.cells[x]
    cell?.focus()
  }

  showPopup(cell: JournalCellComponent) {
    if (cell != this.selectedCell)
      this.hidePopup()

    this.selectedCell = cell
    cell.onMarkClick()
  }

  hidePopup(cell: JournalCellComponent | undefined = this.selectedCell) {
    if (cell != undefined) cell.selectMarkPopup = false
  }

  onKeyPressed(key: string, cell: JournalCellComponent) {
    this.selectedCell = cell

    if (key.length == 1 && cell.show) {
      cell.selectMarkPopup = true
    }
  }

}


