import {Component, Input} from '@angular/core';
import {Subject} from "../../../../data";

@Component({
  selector: 'app-schedule-subject',
  templateUrl: './schedule-subject.component.html',
  styleUrls: ['./schedule-subject.component.scss']
})
export class ScheduleSubjectComponent{
  @Input() subject: Subject | undefined;
}
