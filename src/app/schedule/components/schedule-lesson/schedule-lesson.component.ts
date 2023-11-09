import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Input,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { Router, RouterLink } from '@angular/router';
import { Head3Component } from '@ui/text/head3.component';
import { P1Component } from '@ui/text/p1.component';
import { Head4Component } from '@ui/text/head4.component';
import { environment } from '../../../../enviroments/environment';

@Component({
  selector: 'schedule-lesson',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    Head3Component,
    P1Component,
    Head4Component,
  ],
  templateUrl: './schedule-lesson.component.html',
  styleUrls: ['./schedule-lesson.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScheduleLessonComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ScheduleLessonComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleLessonComponent implements Validator, ControlValueAccessor {
  isUpdated!: boolean;

  @Input() editable: boolean = false;
  @Input() showForeground: boolean = true;
  @Input() routing: boolean = false;
  @Input() preview: boolean = false;

  form = new FormGroup({
    id: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
    room: new FormControl('', Validators.required),
    group: new FormControl('', Validators.required),
    primaryColor: new FormControl('#FFFFFF'),
    secondaryColor: new FormControl('transparent'),
  });

  query = {
    studyPlaceID: '',
  };

  private studyPlaceID!: string;

  private zone = inject(NgZone);
  private router = inject(Router);

  @Input()
  set lesson(value: ScheduleLesson) {
    this.isUpdated = value.isGeneral ?? false;
    this.studyPlaceID = value.studyPlaceID ?? '';
    this.query = { studyPlaceID: this.studyPlaceID ?? environment.studyPlaceID };
    this.setFormValue(value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.form.get('subject')?.errors != null) return this.form.get('subject')!!.errors;
    if (this.form.get('teacher')?.errors != null) return this.form.get('teacher')!!.errors;
    if (this.form.get('room')?.errors != null) return this.form.get('room')!!.errors;
    if (this.form.get('group')?.errors != null) return this.form.get('group')!!.errors;

    return null;
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {}

  writeValue(lesson: ScheduleLesson): void {
    this.setFormValue(lesson);
  }

  buildRouterLink(type: string): string {
    return `/schedule/${type}/${this.form.get(type)?.value}`;
  }

  navigate(url: string): void {
    this.zone.run(() => this.router.navigate([url], { queryParams: this.query })).then();
  }

  private setFormValue(lesson: ScheduleLesson) {
    const value = {
      id: lesson.id || null,
      subject: lesson.subject,
      teacher: lesson.teacher,
      room: lesson.room,
      group: lesson.group,
      primaryColor: lesson.primaryColor,
      secondaryColor: lesson.secondaryColor || null,
    };
    this.form.setValue(value);
  }
}
