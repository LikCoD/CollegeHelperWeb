import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { JwtService } from '@jwt/jwt.service';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { StorageSubject } from '@shared/rxjs/subjects/storage.subject';
import { User } from '@shared/entities/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private jwtService = inject(JwtService)
  userPreview$ = this.jwtService.userPreview$
    .pipe(filterNotNull());

  private http = inject(HttpClient);

  user$ = new StorageSubject(
    () => this.http.get<User>('api/v1/user'),
    { stopOnError: false, takeFirst: true },
  );


  signout(): Observable<void> {
    return this.http.delete<void>('api/v1/user/signout')
      .pipe(tap(() => this.jwtService.removeTokens()));
  }

  revokeToken(): Observable<void> {
    //todo
    return of();
  }
}
