import { Component, inject, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { ControlErrorService } from '@shared/modules/ui/services/control-error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  imports: [CommonModule, MatInputModule],
  standalone: true,
})
export class ControlErrorComponent implements OnInit, OnDestroy {
  @Input({ required: true }) control!: FormControl;

  error$!: Signal<string | null>;

  private errorService = inject(ControlErrorService);
  private subscription?: Subscription;

  ngOnInit(): void {
    [this.error$, this.subscription] = this.errorService.getControlErrorsText$(this.control);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
