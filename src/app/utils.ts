import {AbstractControl, ValidationErrors} from "@angular/forms";
import {Subscription} from "rxjs";
import * as moment from "moment";

export function sameAs(controlName: string) {
  let subscription: Subscription | undefined

  return (group: AbstractControl): ValidationErrors | null => {
    if (subscription == undefined)
      subscription = group.parent?.get(controlName)?.valueChanges.subscribe((value: string) => {
        if (group.value == value) delete group.errors!!['notSame']
        else group.setErrors({...group.errors, notSame: true})
      })

    let value = group.parent?.get(controlName)?.value
    return group.value === value ? null : {notSame: true}
  }
}

export function continueViaGoogle() {
  window.location.href = `/api/user/auth/google?host=${window.location.host}`
}

export function compareDates(date1: moment.Moment, date2: moment.Moment, unit: moment.unitOfTime.StartOf) {
  return date1.clone().startOf(unit).isSame(date2.clone().startOf(unit))
}
