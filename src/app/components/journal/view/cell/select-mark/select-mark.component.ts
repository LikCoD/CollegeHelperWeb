import {Component, Input, OnInit} from '@angular/core';
import {JournalCellComponent} from "../journal-cell.component";
import {HttpClient} from "@angular/common/http";
import {Lesson, Mark} from "../../../../../models";

@Component({
  selector: 'app-select-mark',
  templateUrl: './select-mark.component.html',
  styleUrls: ['./select-mark.component.sass']
})
export class SelectMarkComponent implements OnInit {

  @Input() lesson: Lesson
  @Input() userId: string

  availableMarks: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "н", "зч"]

  selectedMark: Mark | undefined = undefined

  constructor(private http: HttpClient, private parent: JournalCellComponent) {
  }

  ngOnInit(): void {
    console.log(this)

    document.getElementById("markInput")?.focus()
  }

  closePopup(): void {
    this.parent.closePopup()
  }

  confirmInput(key: string, mark: string) {
    if (key != "Enter") return

    this.confirm(mark)
  }

  getSelectedOption(): HTMLInputElement | undefined {
    let selectedToggle: HTMLInputElement | undefined

    let children = document.getElementById("action-toggle-container")!!.children
    for (let child of children as any) {
      if (!child.children[0].checked) continue

      selectedToggle = child.children[0]
      break
    }

    return selectedToggle
  }

  addMark(mark_: string): void {
    let selectedToggle = this.getSelectedOption()
    if (selectedToggle == undefined) return

    if (selectedToggle.id == "mark-add") {
      let mark: Mark = {mark: mark_, userId: this.userId, lessonId: this.lesson!!.id, studyPlaceId: this.lesson!!.studyPlaceId}

      this.http.post<Lesson>("api/journal/mark", mark).subscribe({
        next: value => {
          this.lesson!!.marks = value.marks
        },
        error: console.log
      })
    } else {
      let mark = this.lesson?.marks?.find(mark => {
        return mark.id == selectedToggle!!.id
      })
      if (mark == undefined) return

      mark.mark = mark_

      this.http.put<Lesson>("api/journal/mark", mark).subscribe({
        next: value => {
          this.lesson!!.marks = value.marks
        },
        error: console.log
      })
    }

    this.closePopup()
  }

  removeMark() {
    let selectedToggle = this.getSelectedOption()
    if (selectedToggle == undefined || selectedToggle.id == 'mark-add') return

    this.http.delete<Lesson>("api/journal/mark?markId=" + selectedToggle.id + "&subjectId=" + this.lesson!!.id + "&userId=" + this.userId).subscribe(lesson => {
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
