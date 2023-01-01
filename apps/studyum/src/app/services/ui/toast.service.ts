import {Injectable} from "@angular/core"
import {BehaviorSubject} from "rxjs"

@Injectable({
  providedIn: "root"
})
export class ToastService {
  toast$ = new BehaviorSubject<string | null>(null)

  show(text: string): void {
    this.toast$.next(text)
  }

  close(): void {
    this.toast$.next(null)
  }
}
