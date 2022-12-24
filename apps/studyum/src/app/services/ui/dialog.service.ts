import {Injectable} from "@angular/core"
import {NgbModal} from "@ng-bootstrap/ng-bootstrap"

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private isOpen = false

  constructor(private modalService: NgbModal) {}

  open(content: any, setup: (component: any) => void, open: boolean = true): boolean {
    console.log("ojhgyf")

    if (!open) return false

    console.log("ojhgyf")

    const modalRef = this.modalService.open(content);
    setup(modalRef.componentInstance)

    return true
  }
}
