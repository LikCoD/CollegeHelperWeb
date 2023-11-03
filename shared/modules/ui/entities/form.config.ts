import { FormControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectItems } from '@shared/modules/ui/entities/select';
import { DateTime } from 'luxon';

export type FormValue<V extends Object> = V | Observable<V> | (() => FormValue<V>);

export interface FormConfig<T extends FormConfigElements<T>, V extends Object = any> {
  elements: T;
  value?: FormValue<V>;
}

export interface BaseFormConfigElement<T> {
  control?: FormControl<T>;
  initial?: T;
  hidden?: boolean;
  validators?: ValidatorFn | ValidatorFn[];
  formatter?: (value: any) => any;
}

export interface DependedFormConfigElement<F = any, T = any> {
  dependsOn: string;
  cacheable?: boolean;
  dependsItems: (item: F) => T;
}

export interface DateRangeFormElementValue {
  start?: DateTime | null;
  end?: DateTime | null;
}

export type FormConfigElement<T = string> = BaseFormConfigElement<T> & {
  dependable?: DependedFormConfigElement;
} & (
    | {
        type: FormConfigElementTypes.TEXT;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.NUMBER;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.PASSWORD;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.FILE;
        typeConfig: BaseFormElementTypeConfig<T> & FileFormElementTypeConfig;
      }
    | {
        type: FormConfigElementTypes.IMAGE;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.CHECKBOX;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.SELECT;
        typeConfig: BaseFormElementTypeConfig<T> & SelectFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.SEARCHABLE_SELECT;
        typeConfig: BaseFormElementTypeConfig<T> & SelectFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.AUTOCOMPLETE_TEXT;
        typeConfig: BaseFormElementTypeConfig<T> & SelectFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.DATE_RANGE;
        typeConfig: BaseFormElementTypeConfig<T> & DateRangeFormElementTypeConfig;
      }
    | {
        type: FormConfigElementTypes.DATE_TIME_RANGE;
        typeConfig: BaseFormElementTypeConfig<T> & DateRangeFormElementTypeConfig;
      }
  );

export interface BaseFormElementTypeConfig<V = string> {
  placeholder?: string;
  label?: string;
  hint?: string;
}

export interface SelectFormElementTypeConfig<V = string> {
  items: SelectItems<V>;
}

export interface FileFormElementTypeConfig {
  filetypes?: string | string[];
}

export interface DateRangeFormElementTypeConfig {
  startControlName?: string;
  endControlName?: string;
  expand?: boolean;
  utc?: boolean;
}

export type FormConfigElements<C> = { [K in keyof C]: FormConfigElement<any> };

export enum FormConfigElementTypes {
  TEXT,
  PASSWORD,
  NUMBER,
  FILE,
  IMAGE,
  CHECKBOX,
  SELECT,
  SEARCHABLE_SELECT,
  AUTOCOMPLETE_TEXT,
  DATE_RANGE,
  DATE_TIME_RANGE,
}
