import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  {
    path: 'auth', loadChildren: () => import('@user/modules/auth/auth.module').then(a => a.AuthModule),
  },
  {
    path: 'profile', loadChildren: () => import('@user/modules/profile/profile.module').then(p => p.ProfileModule),
  },
];
