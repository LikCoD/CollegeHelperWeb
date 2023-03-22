import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {LessonComponent} from "./lesson.component"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {RouterLink} from "@angular/router"

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  declarations: [LessonComponent],
  exports: [LessonComponent],
})
export class ScheduleLessonModule {}
