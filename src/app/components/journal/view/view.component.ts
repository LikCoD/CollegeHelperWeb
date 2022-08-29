import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../../app.component";
import {JournalCellComponent} from "./cell/journal-cell.component";
import {GroupMember, Journal, Lesson, Options} from "../../../data";

@Component({
  selector: 'app-login',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class JournalViewComponent implements OnInit {

  options: Options[] = []
  lessons: Lesson[] = []
  groupMembers: GroupMember[] = []

  lessonTypes: string[] = ["Laboratory", "Practice", "General"]

  selectedCell: JournalCellComponent | undefined

  journal: Journal | undefined

  isSelected: Boolean = false

  constructor(private router: Router, private http: HttpClient, private parent: AppComponent, private route: ActivatedRoute) {
    /*    this.http.get<string[]>(`api/journal/types?studyPlaceId=${this.lessons[0].studyPlaceId}`).subscribe({
          next: types => {
            this.lessonTypes = types
          },
          error: console.log
        })*/
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params)
      if (params["group"] == undefined || params["subject"] == undefined || params["teacher"] == undefined) return

      this.http.get<Journal>(`api/journal?group=${params["group"]}&subject=${params["subject"]}&teacher=${params["teacher"]}`).subscribe({
        next: journal => {
          for (let date of journal.dates) {
            date.date = new Date(date.date)
            date.date = new Date(date.date.getTime() + date.date.getTimezoneOffset() * 60000)
          }

          this.isSelected = true

          this.journal = journal
        },
        error: console.log
      })
    })

    this.http.get<Options[]>("api/journal/options").subscribe({
      next: options => {
        console.log(options)

        if (options.length == 1) {
          this.router.navigateByUrl(`/journal/view?group=${options[0].group}&subject=${options[0].subject}&teacher=${options[0].teacher}`, )
          return
        }

        this.options = options
      },
      error: console.log
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


