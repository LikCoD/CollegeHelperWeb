import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {GeneralService} from "../../../../services/shared/general.service"
import {map, Observable, tap} from "rxjs"
import {StudyPlace} from "../../../../models/general"
import {JournalService} from "../../../../services/shared/journal/journal.service"
import * as moment from "moment/moment"

@Component({
  selector: "app-generate-marks-report",
  templateUrl: "./generate-marks-report.component.html",
  styleUrls: ["./generate-marks-report.component.scss"]
})
export class GenerateMarksReportComponent {
  form = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    lessonType: new FormControl("", Validators.required),
    mark: new FormControl("", Validators.required),
    notExists: new FormControl(false, Validators.required)
  })

  studyPlace$: Observable<StudyPlace>

  constructor(private generalService: GeneralService, private service: JournalService) {
    //TODO current
    this.studyPlace$ = this.generalService.studyPlaces$.pipe(map(sp => sp[0]), tap(sp => {
      let type = sp.lessonTypes.filter(el => !!el.standaloneMarks)[0]
      if (!type) return

      this.form.get("lessonType")!!.setValue(type.type)
      this.form.get("mark")!!.setValue(type.standaloneMarks[0].mark)
    }))
  }

  submit(): void {
    let v = this.form.value
    v.startDate = moment.utc(v.startDate).toISOString()
    v.endDate = moment.utc(v.endDate).toISOString()

    this.service.generateMarks(v)
  }

  marks(studyPlace: StudyPlace): string[] {
    return studyPlace.lessonTypes
      .flatMap(t => [...t.marks ?? [], ...t.standaloneMarks ?? []])
      .map(m => m.mark)
      .filter((value, index, array) => array.indexOf(value) === index)
  }

  isSelectedMark(studyPlace: StudyPlace, mark: string): boolean {
    return !!studyPlace.lessonTypes.filter(t => !!t.standaloneMarks).flatMap(m => m.standaloneMarks).find(m => m.mark === mark)
  }
}
