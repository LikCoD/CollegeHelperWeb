import { inject, Injectable } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { map, Observable } from 'rxjs';
import { UserService } from '@shared/services/user.service';
import { EditProfileFormData } from '@user/modules/profile/dialogs/edit-profile/edit-profile.dto';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  updateFormOptions: SubmitOptions = {
    url: 'api/v1/user',
    method: 'PUT',
    subscribe: true,
  };

  currentProfile$: Observable<EditProfileFormData> = inject(UserService).userPreview$
    .pipe(map(user => <EditProfileFormData>{
      login: user.login,
      email: user.email,
    }));
}