import {AbstractControl, ValidationErrors} from "@angular/forms"
import {Subscription} from "rxjs"
import * as moment from "moment"

export function sameAs(controlName: string) {
  let subscription: Subscription | undefined

  return (group: AbstractControl): ValidationErrors | null => {
    if (subscription == undefined)
      subscription = group.parent
        ?.get(controlName)
        ?.valueChanges.subscribe((value: string) => {
          if (group.value == value) delete group.errors!!["notSame"]
          else group.setErrors({...group.errors, notSame: true})
        })

    let value = group.parent?.get(controlName)?.value
    return group.value === value ? null : {notSame: true}
  }
}

export function groupBy<T, R>(arr: T[], byFn: (el: T) => R): Map<R, T[]> {
  return arr.reduce((r: Map<R, T[]>, a) => {
    let by = byFn(a)
    r.set(by, [...(r.get(by) || []), a])
    return r
  }, new Map<R, T[]>())
}

export function continueViaGoogle() {
  window.location.href = `/api/user/oauth2/google?redirect=${window.location.origin}/auth/token`
}

export function compareDates(
  date1: moment.Moment,
  date2: moment.Moment,
  unit: moment.unitOfTime.StartOf
) {
  return date1.clone().startOf(unit).isSame(date2.clone().startOf(unit))
}
