import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core"
import {ToastData, ToastService} from "../../../services/ui/toast.service"
import {Observable} from "rxjs"

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {
  toast$: Observable<ToastData | null>

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  close(): void {
    this.toastService.close()
  }

  ngOnInit(): void {
    this.toast$ = this.toastService.toast$
  }
}
