import {Injectable} from "@angular/core"
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router"
import {map, Observable} from "rxjs"
import {UserService} from "../services/core/user.service"
import {User} from "../models/user"

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.user$.pipe(
      map((user?: User) => {
        return user == undefined
      })
    )
  }
}
