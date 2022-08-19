import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value?: moment.Moment, pattern?: string): string {
    if (value == undefined) return ""
    return value.format(pattern)
  }

}
