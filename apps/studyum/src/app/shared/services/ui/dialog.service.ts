import {Injectable} from "@angular/core"
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap"
import {from, Observable, tap} from "rxjs"

@Injectable({
  providedIn: "root"
})
export class DialogService {

  showModal = false

  openedModalRef: NgbModalRef | null = null

  constructor(private modalService: NgbModal) {
  }

  set width(width: number) {
    this.showModal = width < 625
  }

  openOnMinWidth(component: any, open: boolean = this.showModal): Observable<any> | null {
    if (this.openedModalRef !== null || !open) return null
    return this.open(component)
  }

  open<T>(component: any): Observable<T> {
    this.openedModalRef = this.modalService.open(component)
    return from(this.openedModalRef.result).pipe(tap(_ => this.openedModalRef = null))
  }

  close(result: any = null): void {
    this.openedModalRef?.close(result)
  }

  dismiss(result: any = null) {
    this.openedModalRef?.dismiss(result)
  }
}
