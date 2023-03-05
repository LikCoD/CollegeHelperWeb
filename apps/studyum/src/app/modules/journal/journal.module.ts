import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {JournalRoutingModule} from "./journal-routing.module"
import {CellExpandComponent} from "../../components/standalones/popups/cell-expand/cell-expand.component"
import {JournalViewComponent} from "../../components/journal/view/view.component"
import {JournalCellComponent} from "../../components/journal/view/base-journal/base-journal-cell/journal-cell.component"
import {JournalComponent} from "../../components/journal/journal.component"
import {BaseJournalComponent} from "../../components/journal/view/base-journal/base-journal.component"
import {GenerateMarksReportComponent} from "../../components/journal/generate/generate-marks-report/generate-marks-report.component"
import {GenerateAbsencesReportComponent} from "../../components/journal/generate/generate-absences-report/generate-absences-report.component"
import {AbsenceControlComponent} from "../../components/standalones/popups/select-mark/enteries/absence-control.component"
import {SelectMarkComponent} from "../../components/standalones/popups/select-mark/select-mark.component"
import {LessonAdditionDataComponent} from "../../components/standalones/popups/lesson-addition-data/lesson-addition-data.component"
import {JournalBottomBarComponent} from "../../components/journal/view/journal-bottom-bar/journal-bottom-bar.component"
import {BaseJournalDateItemComponent} from "../../components/journal/view/base-journal/base-journal-date-item/base-journal-date-item.component"
import {JournalTopBarComponent} from "../../components/journal/view/journal-top-bar/journal-top-bar.component"
import {LessonInfoComponent} from "../../components/standalones/popups/lesson-info/lesson-info.component"
import {BaseJournalDatesComponent} from "../../components/journal/view/base-journal/base-journal-dates/base-journal-dates.component"
import {BaseJournalRowComponent} from "../../components/journal/view/base-journal/base-journal-row/base-journal-row.component"
import {BaseJournalDateCollapseComponent} from "../../components/journal/view/base-journal/base-journal-dates/base-journal-date/base-journal-date-collapse/base-journal-date-collapse.component"
import {BaseJournalDateComponent} from "../../components/journal/view/base-journal/base-journal-dates/base-journal-date/base-journal-date.component"
import {BaseJournalColumnCellComponent} from "../../components/journal/view/base-journal/base-journal-row/base-journal-column-cell/base-journal-column-cell.component"
import {BaseJournalCollapserComponent} from "../../components/journal/view/base-journal/base-journal-collapser/base-journal-collapser.component"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "../shared.module"
import {ModalsModule} from "modals"
import {NgxPopperjsModule} from "ngx-popperjs"
import {TextDirective} from "../../../../../../libs/auto-color/src/lib/text.directive"
import {ErrorInfoComponent} from "../../../../../../libs/ui-elements/src/lib/elements/error-info/error-info.component"

@NgModule({
  declarations: [
    CellExpandComponent,
    JournalViewComponent,
    JournalCellComponent,
    JournalComponent,
    BaseJournalComponent,
    GenerateMarksReportComponent,
    GenerateAbsencesReportComponent,
    AbsenceControlComponent,
    SelectMarkComponent,
    LessonAdditionDataComponent,
    JournalBottomBarComponent,
    BaseJournalDateItemComponent,
    JournalTopBarComponent,
    LessonInfoComponent,

    BaseJournalDatesComponent,
    BaseJournalRowComponent,

    BaseJournalDateCollapseComponent,
    BaseJournalDateComponent,
    BaseJournalColumnCellComponent,

    BaseJournalCollapserComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalsModule,
    NgxPopperjsModule,
    TextDirective,
    ModalsModule,
    ErrorInfoComponent,
    JournalRoutingModule,
  ],
})
export class JournalModule {}
