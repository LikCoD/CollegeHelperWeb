import {AbstractControl, ValidationErrors} from "@angular/forms";
import {Subscription} from "rxjs";

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
