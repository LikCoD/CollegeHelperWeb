import {Component} from '@angular/core';
import {UserService} from "../../../services/shared/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  constructor(public userService: UserService) {
  }

  revoke() {
    this.userService.revokeToken()
  }

  signOut() {
    this.userService.signOut()
  }
}
