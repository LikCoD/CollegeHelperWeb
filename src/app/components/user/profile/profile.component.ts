import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, userStatus} from "../../../data";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | undefined;
  status: string | undefined;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<User>('/api/user').subscribe(user => {
      this.user = user;
      this.status = userStatus(user);
    });
  }

}
