import {Pipe, PipeTransform} from "@angular/core"
import * as moment from "moment"

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value?: moment.Moment, pattern?: string): string {
    return value?.format(pattern) ?? ""
  }

}
