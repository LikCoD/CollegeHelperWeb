import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'schedule',
    loadChildren: () => import('@schedule/schedule.module').then(m => m.ScheduleModule),
  },
  // {
  //   path: 'journal',
  //   loadChildren: () => import('@journal/journal.module').then(m => m.JournalModule),
  // },
  { path: 'user', loadChildren: () => import('@user/user.module').then(m => m.UserModule) },
  // { path: '', loadChildren: () => import('@home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: 'schedule' },
];
