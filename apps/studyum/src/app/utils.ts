import {AbstractControl, ValidationErrors} from "@angular/forms"

export const sameAs =
  (controlName: string) =>
  (group: AbstractControl): ValidationErrors | null => {
    const parent = group.parent?.get(controlName)
    parent?.addValidators((control: AbstractControl): null => {
      if (group.value != control.value) {
        group.setErrors({...group.errors, notSame: true})
        return null
      }

      if (!group.errors) return null
      delete group.errors["notSame"]

      const errorsAmount = Object.keys(group.errors ?? {}).length
      if (errorsAmount === 0) group.setErrors(null)
      return null
    })

    const value: string = group.parent?.get(controlName)?.value
    return group.value === value ? null : {notSame: true}
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
