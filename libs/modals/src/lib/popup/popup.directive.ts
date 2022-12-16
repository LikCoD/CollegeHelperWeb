import {ChangeDetectorRef, Directive, ElementRef, HostListener, Input, ViewContainerRef} from "@angular/core"
import {
  NgxPopperjsContentComponent,
  NgxPopperjsDirective,
  NgxPopperjsOptions,
  NgxPopperjsPlacements
} from "ngx-popperjs"

@Directive({
  selector: "[appPopup]"
})
export class PopupDirective {

  popper: NgxPopperjsDirective

  constructor(private cdr: ChangeDetectorRef, private elRef: ElementRef<HTMLElement>, private vcr: ViewContainerRef) {
    let config: NgxPopperjsOptions = {
      placement: NgxPopperjsPlacements.BOTTOMSTART,
      disableDefaultStyling: true,
      hideOnClickOutside: false,
    }
    this.popper = new NgxPopperjsDirective(this.cdr, this.elRef, this.vcr, config)
  }

  @Input() set appPopup(content: NgxPopperjsContentComponent) {
    this.popper.content = content
    this.popper.ngOnInit()
  }

  @Input() set show(show: boolean) {
    show ? this.popper.show() : this.popper.hide()
  }

  @HostListener("click", ["$event"])
  private onClick(event: Event): void {
    event.stopImmediatePropagation()
  }
}
