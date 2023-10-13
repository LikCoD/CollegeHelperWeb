import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmService {
  private http = inject(HttpClient)

  formOptions: SubmitOptions = {
    url: 'api/v1/user/email/confirm',
    method: 'POST',
    subscribe: true,
  };

  sendCode(): Observable<void> {
    return this.http.post<void>('api/v1/user/email/resendCode', null)
  }

  confirmCode(code: string): Observable<void> {
    return this.http.post<void>('api/v1/user/email/confirm', code)
  }
}