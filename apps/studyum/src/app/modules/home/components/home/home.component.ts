import {Component, OnInit} from "@angular/core"
import {JwtService} from "../../../../../../../../libs/common/jwt-http/src/lib/jwt.service"
import {Observable} from "rxjs"
import {Card} from "../../../../../../../../libs/home/cards/src/lib/models"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  cards: Card[] = [
    {
      title: "header.schedule",
      url: "assets/schedule-gray.svg",
      route: "schedule",
      permissions: undefined
    },
    {
      title: "header.journal",
      url: "assets/journal-gray.svg",
      route: "journal",
      permissions: []
    }
  ]

  user$: Observable<any>

  constructor(public jwtService: JwtService) {
  }

  ngOnInit(): void {
    this.user$ = this.jwtService.userPreview$
  }
}
