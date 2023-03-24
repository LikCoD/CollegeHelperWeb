import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {PreviewComponent} from "./components/preview/preview.component"
import {TextDirective} from "../../../../common/auto-color/src/lib/text.directive"
import {ScheduleLessonModule} from "schedule/lesson"
import {SharedModule} from "../../../../../apps/studyum/src/app/shared/shared.module"

@NgModule({
  imports: [CommonModule, TextDirective, ScheduleLessonModule, SharedModule],
  declarations: [PreviewComponent],
  exports: [PreviewComponent],
})
export class HomeScheduleModule {}
