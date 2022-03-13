import {Component, Input, OnInit} from '@angular/core';
import {JournalCellComponent} from "../journal-cell.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-select-mark',
  templateUrl: './select-mark.component.html',
  styleUrls: ['./select-mark.component.sass']
})
export class SelectMarkComponent implements OnInit {

  @Input() lesson: Lesson | undefined
  @Input() userId: string | undefined
  @Input() marks: any[] = []

  availableMarks: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "н", "зч"]

  constructor(private http: HttpClient, private parent: JournalCellComponent) {
  }

  ngOnInit(): void {
    document.getElementById("markInput")?.focus()
  }

  closePopup(): void {
    this.parent.selectMarkPopup = false
  }

  confirmInput(key: string, mark: string) {
    if (key != "Enter") return

    this.confirm(mark)
  }

  addMark(mark: string): void {
    let selectedToggle: HTMLInputElement | undefined

    let children = document.getElementById("action-toggle-container")!!.children
    for (let child of children as any) {
      if (!child.children[0].checked) continue

      selectedToggle = child.children[0]
      break
    }

    if (selectedToggle == undefined) return

    let url = selectedToggle.id == "mark-add" ?
      "addMark?group=" + this.lesson!!.group + "&subject=" + this.lesson!!.subject + "&date=" + this.lesson!!.date.toLocaleDateString() + "&userId=" + this.userId + "&mark=" + mark + "&subjectId=" + this.lesson!!.id :
      "editMark?markId=" + selectedToggle.id + "&mark=" + mark + "&subjectId=" + this.lesson!!.id + "&group=" + this.lesson!!.group + "&subject=" + this.lesson!!.subject + "&userId=" + this.userId + "&date=" + this.lesson!!.date.toLocaleDateString()

    this.http.get<Lesson>("api/journal/teachers/" + url).subscribe(lesson => {
      console.log(lesson)
      this.lesson!!.marks = lesson.marks
    })

    this.closePopup()
  }

  confirm(mark: string): void {
    if (!this.availableMarks.includes(mark)) {
      alert("wrong mark")
      return
    }

    this.addMark(mark)
  }
}
