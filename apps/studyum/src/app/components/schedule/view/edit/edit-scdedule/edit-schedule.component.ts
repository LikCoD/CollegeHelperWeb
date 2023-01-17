import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core"
import {ScheduleService} from "../../../../../services/shared/schedule.service"
import {Lesson, Schedule} from "../../../../../models/schedule"
import {DialogService} from "../../../../../services/ui/dialog.service"

@Component({
  selector: "app-edit-schedule",
  templateUrl: "./edit-schedule.component.html",
  styleUrls: ["./edit-schedule.component.scss"]
})
export class EditScheduleComponent {

  @ViewChild("manageSubjectTemplate", {static: true}) manageSubjectRef: ElementRef
  @Output() makeGeneral = new EventEmitter<null>()
  templateLessons: Lesson[] = []
  templatesFilter: string = ""
  selectedLesson: Lesson | null

  constructor(public dialog: DialogService, private scheduleService: ScheduleService) {
  }

  @Input() set schedule(schedule: Schedule) {
    let lessons: Lesson[] = []

    schedule.lessons.forEach(lesson => {
      let add = true

      lessons.forEach(templateSubject => {
        if (templateSubject.subject == lesson.subject
          && templateSubject.group == lesson.group
          && templateSubject.room == lesson.room
          && templateSubject.teacher == lesson.teacher)
          add = false
      })
      if (!add) return

      lessons.push({...lesson})
    })

    this.templateLessons = lessons
  }

  filterLessons(input: string): Lesson[] {
    return this.templateLessons.filter(value => this.filter(input, value))
  }

  filter(input: string, lesson: Lesson): boolean {
    input = input.toLowerCase()

    return lesson.subject.toLowerCase().includes(input)
      || lesson.group.toLowerCase().includes(input)
      || lesson.teacher.toLowerCase().includes(input)
      || lesson.room.toLowerCase().includes(input)
  }

  add(lesson: Lesson | undefined = undefined) {
    this.selectedLesson = lesson ?? null
    this.dialog.open<Lesson>(this.manageSubjectRef).subscribe({
      next: lesson => this.scheduleService.addLesson(lesson)
    })
  }
}
