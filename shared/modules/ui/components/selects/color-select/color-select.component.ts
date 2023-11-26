import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from '@ui/errors/control-error/control-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BaseSelectComponent } from '@ui/selects/base-select.component';
import { IconComponent } from '@ui/images/icon.component';
import { P1Component } from '@ui/text/p1.component';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'color-select',
  templateUrl: './color-select.component.html',
  styleUrls: ['./color-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorSelectComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    ControlErrorComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    IconComponent,
    P1Component,
    TranslatePipe,
  ],
  standalone: true,
})
export class ColorSelectComponent<V> extends BaseSelectComponent<V> {}
