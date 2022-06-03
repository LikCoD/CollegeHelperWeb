import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {map, Observable} from "rxjs";
import {User} from "../../models";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class UserService {

  user$: Observable<User>

  constructor(private httpService: HttpService, private router: Router) {
    this.user$ = httpService.getUser()
  }

  login(credentials: any){
    this.user$ = this.httpService.login(credentials).pipe(map((value) => {
      this.router.navigate([""])

      return value
    }))
  }
}
