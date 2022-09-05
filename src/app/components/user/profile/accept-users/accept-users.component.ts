import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-accept-users',
  templateUrl: './accept-users.component.html',
  styleUrls: ['./accept-users.component.scss']
})
export class AcceptUsersComponent implements OnInit {
  usersToAccept: User[] | undefined

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<User[]>("api/user/toAccept").subscribe(users => {
      this.usersToAccept = users
    });
  }

  buildUser(user: User) {
    let type = "";
    switch (user.type) {
      case "group":
        type = user.typeName;
        break;
      case "teacher":
        type = "Teacher";
        break;
    }

    return `${user.name} ${type}`
  }

  acceptUser(user: User) {
    this.http.put("api/user/accept", user.id).subscribe({
      next: () => {
        this.usersToAccept = this.usersToAccept!!.filter(u => u.id != user.id)
      }
    })
  }

  declineUser(user: User) {
    this.http.put("api/user/decline", user.id).subscribe(() => {
      this.usersToAccept = this.usersToAccept!!.filter(u => u.id != user.id)
    })
  }
}
