import {Injectable} from "@angular/core"
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap"
import {catchError, from, Observable, of, tap} from "rxjs"

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

  open(component: any) {
    this.openedModalRef = this.modalService.open(component)
    return from(this.openedModalRef.result).pipe(catchError(e => of(e)), tap(_ => this.openedModalRef = null))

  }

  close(): void {
    this.openedModalRef?.close()
  }
}
