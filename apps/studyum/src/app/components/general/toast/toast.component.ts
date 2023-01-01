import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core"
import {ToastService} from "../../../services/ui/toast.service"

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit {

  toast: string | null = null

  constructor(private toastService: ToastService, private cdr: ChangeDetectorRef) {
  }

  close(): void {
    this.toastService.close()
  }

  ngOnInit(): void {
    this.toastService.toast$.subscribe({
      next: toast => {
        this.toast = toast
        this.cdr.detectChanges()
      }
    })
  }
}
