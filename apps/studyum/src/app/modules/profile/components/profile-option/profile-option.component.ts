import {Component, Input, OnInit} from "@angular/core"
import {animate, state, style, transition, trigger} from "@angular/animations"

@Component({
  selector: "app-profile-option",
  templateUrl: "./profile-option.component.html",
  styleUrls: ["./profile-option.component.scss"],
  animations: [
    trigger("rotatedState", [
      state("default", style({transform: "rotate(0)"})),
      state("rotated", style({transform: "rotate(-180deg)"})),
      transition("rotated => default", animate("300ms ease-out")),
      transition("default => rotated", animate("300ms ease-in")),
    ]),
    trigger("showItemState", [
      state("close", style({height: "0", borderColor: "rgba(0,0,0,0)"})),
      state("open", style({height: "*", borderColor: "#FAFAFA"})),
      transition("close => open", animate("300ms ease-out")),
      transition("open => close", animate("300ms ease-in")),
    ]),
  ],
})
export class ProfileOptionComponent implements OnInit {
  @Input() title: string
  @Input() opened: boolean = false

  contentState = "close"
  arrowState = "default"

  itemClicked() {
    this.contentState = this.contentState == "open" ? "close" : "open"
    this.arrowState = this.arrowState == "default" ? "rotated" : "default"
  }

  ngOnInit(): void {
    this.contentState = this.opened ? "open" : "close"
    this.arrowState = this.opened ? "rotated" : "default"
  }
}
