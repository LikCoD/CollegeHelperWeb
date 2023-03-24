import {Component, Input} from "@angular/core"

@Component({
  selector: "home-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent {
  @Input() title: string
  @Input() imageUrl: string
  @Input() routerLink: string
}
