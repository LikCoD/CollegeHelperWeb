import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { ControlErrorService } from '@shared/modules/ui/services/control-error.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  imports: [CommonModule, MatInputModule],
  standalone: true,
})
export class ControlErrorComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  error$!: Observable<string>;

  private errorService = inject(ControlErrorService);

  ngOnInit(): void {
    this.error$ = this.errorService.getControlErrorsText$(this.control);
  }
}
