import { Routes } from '@angular/router';
import { JournalComponent } from './journal.component';

export const routes: Routes = [
  {
    path: '',
    component: JournalComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@journal/modules/landing/journal-landing.module').then(m => m.JournalLandingModule),
      },
      {
        path: 'view',
        loadChildren: () => import('@journal/modules/view/journal-view.module').then(m => m.JournalViewModule),
      },
    ],
  },
];
