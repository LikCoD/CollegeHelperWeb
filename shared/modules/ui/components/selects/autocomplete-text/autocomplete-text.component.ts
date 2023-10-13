import { Component, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from '@ui/errors/control-error/control-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IconComponent } from '@ui/images/icon.component';
import { BaseSelectComponent } from '@ui/selects/base-select.component';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, map, Observable } from 'rxjs';
import { HDividerComponent } from '@ui/dividers/h-divider.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';

@Component({
  selector: 'autocomplete-text',
  templateUrl: './autocomplete-text.component.html',
  styleUrls: ['./autocomplete-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteTextComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, ControlErrorComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, IconComponent, TranslateModule, HDividerComponent, MatAutocompleteModule],
  standalone: true,
})
export class AutocompleteTextComponent<V> extends BaseSelectComponent<V> implements OnInit {
  search$!: Observable<string>;

  ngOnInit(): void {
    this.search$ = this.control.valueChanges
      .pipe(debounceTime(150))
      .pipe(filterNotNull())
      .pipe(map(v => `${v}`.toLowerCase() ?? ''));
  }

  show(search: string | null, display: string): boolean {
    return !search || display.toLowerCase().indexOf(search) !== -1;
  }
}
