import {Component, EventEmitter, Output} from "@angular/core"
import {DialogService} from "../../../services/ui/dialog.service"

@Component({
  selector: 'app-dialog-frame',
  templateUrl: './dialog-frame.component.html',
  styleUrls: ['./dialog-frame.component.scss']
})
export class DialogFrameComponent {
  @Output() close = new EventEmitter<null>()

  constructor(private modalService: DialogService) {
  }

  closeDialog(): void {
    this.close.emit()
    this.modalService.dismiss()
  }
}
