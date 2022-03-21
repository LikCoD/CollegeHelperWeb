import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../../app.component";
import {JournalCellComponent} from "./cell/journal-cell.component";
import {GroupMember, Lesson, Subject} from "../../../data";

@Component({
  selector: 'app-login',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class JournalViewComponent implements OnInit {

  groups: Subject[] = []
  lessons: Lesson[] = []
  groupMembers: GroupMember[] = []

  lessonTypes: string[] = ["Laboratory", "Practice", "General"]

  selectedCell: JournalCellComponent | undefined

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
      if (params["group"] == undefined || params["subject"] == undefined) return

      this.http.get<Lesson[]>("api/journal/teachers/dates?subject=" + params["subject"] + "&group=" + params["group"], {observe: 'response'}).subscribe(subjects => {
        let error = subjects.headers.get("error")
        if (error != undefined) {
          if (error == "not authorized")
            this.router.navigateByUrl("login")
          else
            alert(error)

          return
        }

        if (subjects.body == null)
          return

        subjects.body.forEach(el => {
          el.date = new Date(el.date)
        })

        this.lessons = subjects.body
        this.isSelected = true
      })

      this.http.get<GroupMember[]>("api/journal/teachers/groupMembers?group=" + params["group"], {observe: 'response'}).subscribe(members => {
        let error = members.headers.get("error")
        if (error != undefined) {
          if (error == "not authorized")
            this.router.navigateByUrl("login")
          else
            alert(error)

          return
        }

        if (members.body == null)
          return

        this.groupMembers = members.body

        for (let groupMember of this.groupMembers) {
          this.http.get<Lesson[]>("api/journal/teachers/mark?group=" + params["group"] + "&subject=" + params["subject"] + "&userId=" + groupMember.id, {observe: 'response'}).subscribe(lessons => {
            if (lessons.body == null) return

            lessons.body.forEach(el => {
              el.date = new Date(el.date)
            })

            groupMember.lessons = lessons.body
          });
        }
      })
    })

    this.http.get<Subject[]>("api/journal/teachers/types", {observe: 'response'}).subscribe(subjects => {
      let error = subjects.headers.get("error")
      if (error != undefined) {
        if (error == "not authorized")
          this.router.navigateByUrl("login")
        else
          alert(error)

        return
      }

      if (subjects.body == null)
        return

      this.groups = subjects.body
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

    if (key.length == 1) {
      cell.selectMarkPopup = true
    }
  }

}


