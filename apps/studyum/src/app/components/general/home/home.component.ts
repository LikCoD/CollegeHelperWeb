import {Component} from "@angular/core"
import {UserService} from "../../../services/shared/user.service"
import {User} from "../../../models/user"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  cards: { title: string, url: string, route: string, permissions?: string[] }[] = [
    {
      title: 'header.schedule',
      url: 'assets/schedule-gray.svg',
      route: 'schedule',
      permissions: undefined
    },
    {
      title: 'header.journal',
      url: 'assets/journal-gray.svg',
      route: 'journal',
      permissions: []
    }
  ];

  user?: User;

  constructor(public userService: UserService) {
    this.userService.user$.subscribe({ next: u => this.user = u });
  }

  checkPermissions(permissions?: string[]) {
    if (permissions == undefined) return true;
    if (this.user == undefined) return false;

    for (let permission of permissions)
      if (this.user?.permissions.findIndex(p => p == permission) == -1) return false;

    return true;
  }

}
