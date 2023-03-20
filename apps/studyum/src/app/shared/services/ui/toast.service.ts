import {Injectable} from "@angular/core"
import {BehaviorSubject} from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ToastService {
  toast$ = new BehaviorSubject<ToastData | null>(null)

  showError(text: string): void {
    this.toast$.next({message: text, color: "#FF4B4B"})
  }

  showInfo(text: string) {
    this.toast$.next({message: text, color: "#207020"})
  }

  close(): void {
    this.toast$.next(null)
  }
}

export interface ToastData {
  message: string
  color: string
}
