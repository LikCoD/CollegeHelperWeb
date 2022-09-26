import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ScheduleService} from "../../../../../services/shared/schedule.service";
import {AddSubjectDialogComponent} from "../add-subject-dialog/add-subject-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Lesson, Schedule} from "../../../../../models/schedule";

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent {

  @Input() set schedule(schedule: Schedule) {
    let lessons: Lesson[] = []

    schedule.lessons.forEach(lesson => {
      let add = true

      lessons.forEach(templateSubject => {
        if (templateSubject.subject == lesson.subject
          && templateSubject.group == lesson.group
          && templateSubject.room == lesson.room
          && templateSubject.teacher == lesson.teacher)
          add = false;
      })
      if (!add) return

      lessons.push({...lesson})
    })

    this.templateLessons = lessons
  }

  @Output() makeGeneral = new EventEmitter<null>()

  templateLessons: Lesson[] = []
  templatesFilter: string = ""

  constructor(public dialog: MatDialog, private scheduleService: ScheduleService) {
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
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {data: {lesson: lesson}})
    dialogRef.afterClosed().subscribe(this.scheduleService.addLesson.bind(this.scheduleService))
  }
}
