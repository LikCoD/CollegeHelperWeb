import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core"
import {CommonModule} from "@angular/common"

@Component({
  selector: "spacer",
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styles: [`
      :host {
          display: block;
      }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpacerComponent {
  @HostBinding("style.flex-grow")
  @Input() weight: number = 1
}
