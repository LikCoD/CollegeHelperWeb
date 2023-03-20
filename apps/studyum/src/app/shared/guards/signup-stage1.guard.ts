import {Injectable} from "@angular/core"
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router"
import {map, Observable} from "rxjs"
import {UserService} from "../services/core/user.service"
import {User} from "../models/user"

@Injectable({
  providedIn: "root",
})
export class SignupStage1Guard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.user$.pipe(
      map((user?: User) => {
        if (user == undefined) return false

        return user.type == ""
      })
    )
  }
}
