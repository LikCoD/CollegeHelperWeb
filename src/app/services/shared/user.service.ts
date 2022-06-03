import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {User} from "../../models";

@Injectable({providedIn: 'root'})
export class UserService {

  user$: Observable<User>

  constructor(private httpService: HttpService) {
    this.user$ = httpService.getUser().pipe()
  }

}
