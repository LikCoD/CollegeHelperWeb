import {Component, Input} from "@angular/core"

@Component({
  selector: "app-glassmorphism-frame",
  templateUrl: "./glassmorphism-frame.component.html",
  styleUrls: ["./glassmorphism-frame.component.scss"],
})
export class GlassmorphismFrameComponent {
  @Input() color: string
  @Input() bottomColor: string = "transparent"
  @Input() topColor: string = "transparent"
}
