import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-receive-token',
  template: 'Successful, you can return to <a routerLink="/">main page</a>',
})
export class ReceiveTokenComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.putToken(this.router.parseUrl(this.router.url).queryParams["token"])
  }

}
