import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, userStatus} from "../../../data";
import {HttpService} from "../../../services/http/http.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: User | undefined;
  status: string | undefined;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.httpService.getUser().subscribe(user => {
      this.user = user;
      this.status = userStatus(user);
    });
  }

  revoke(){
    this.httpService.revokeToken()
  }
}
