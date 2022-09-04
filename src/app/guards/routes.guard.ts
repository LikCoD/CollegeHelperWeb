import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {UserService} from "../services/shared/user.service";
import {User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class RoutesGuard implements CanActivate {

  user: User | undefined
  isUserInitialized = false

  routes = {
    undefined: ["login", "signup", "user/receiveToken", "schedule", "schedule/login", ""],
    singUpStage1: ["signup/stage1", "user", "schedule", "schedule/login", ""],

    elseNot: ["login", "signup", "signup/stage1"]
  }

  constructor(private userService: UserService) {
    this.userService.user$.subscribe({
      next: user => {
        this.isUserInitialized = true
        this.user = user
      }
    })
  }

  checkRoute(user: User | undefined, path: string): boolean {
    if (this.user == undefined) return !!this.routes.undefined.find(value => value == path)
    if (this.user.type == "") return !!this.routes.singUpStage1.find(value => value == path)

    return !this.routes.elseNot.find(value => value == path)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let path = route.routeConfig!!.path!!

    if (!this.isUserInitialized) {
      return this.userService.user$.pipe(map(user => {
        return this.checkRoute(user, path)
      }))
    }

    return this.checkRoute(this.user, path)
  }

}
