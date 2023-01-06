import {Directive, ElementRef, Input} from "@angular/core"
import {ColorService} from "./services/color.service"

@Directive({
  selector: "[autoColorText]",
  standalone: true,
})
export class TextDirective {

  constructor(private elRef: ElementRef<HTMLElement>, private service: ColorService) {

  }

  @Input() set background(bgColor: string) {
    this.elRef.nativeElement.style.backgroundColor = bgColor
    this.elRef.nativeElement.style.color = this.service.getTextColor(bgColor)
  }
}
