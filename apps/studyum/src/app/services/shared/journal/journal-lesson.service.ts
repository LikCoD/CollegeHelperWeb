import {Injectable} from "@angular/core"
import {ScheduleHttpService} from "../../http/schedule-http.service"
import {Lesson} from "../../../models/schedule"
import {JournalService} from "./journal.service"

@Injectable({
  providedIn: "root"
})
export class JournalLessonService {

  constructor(private http: ScheduleHttpService, private service: JournalService) {
  }

  get journal() {
    return this.service.journal
  }

  editLesson(lesson: Lesson): void {
    this.http.updateLesson(lesson).subscribe({
      next: lesson => {
        for (let i = 0; i < this.journal.dates.length; i++) {
          for (let j = 0; j < this.journal.dates[i].length; j++) {
            for (let k = 0; k < this.journal.dates[i][j].length; k++) {
              if (this.journal.dates[i][j][k].id !== lesson.id) continue

              this.journal.dates[i][j][k] = lesson
              break
            }
          }
        }
      }
    })
  }
}
