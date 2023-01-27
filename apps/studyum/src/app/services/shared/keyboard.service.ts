import {Injectable} from "@angular/core"
import {BehaviorSubject, Observable} from "rxjs"
import {Key} from "./journal/journal.cell.service"

@Injectable({
  providedIn: "root",
})
export class KeyboardService {
  private _key$ = new BehaviorSubject<Key>("null")

  set key(key: Key) {
    this._key$.next(key)
  }

  get key(): Key {
    return this._key$.value
  }

  get key$(): Observable<Key> {
    return this._key$
  }
}
