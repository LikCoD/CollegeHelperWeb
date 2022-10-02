import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lesson } from '../../../../models/schedule';
import { Mark } from '../../../../models/journal';

@Component({
  selector: 'app-absence-add',
  templateUrl: './absence-add.component.html',
  styleUrls: ['./absence-add.component.scss']
})
export class AbsenceAddComponent implements OnInit {

  @Input() lesson: Lesson;
  @Input() userId: string;
  @Input() absentMark: string;

  @Output() set = new EventEmitter<number | null>();
  @Output() update = new EventEmitter<number | null>();
  @Output() remove = new EventEmitter<string>();

  @Output() close = new EventEmitter<null>();

  mark: Mark | undefined;

  ngOnInit() {
    if (this.lesson.marks?.length != 1) return;

    this.mark = this.lesson.marks[0];
  }

  confirm(minutes: string | null) {
    if (minutes == '') {
      this.remove.emit(this.mark?.id);
      return;
    }

    let iMinutes = minutes ? parseInt(minutes) : null;
    if (this.mark) this.update.emit(iMinutes);
    else this.set.emit(iMinutes);

    this.close.emit();
  }
}
