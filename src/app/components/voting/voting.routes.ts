import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'portal',
    loadComponent: () =>
      import('./portal/portal.component').then((m) => m.PortalComponent),
  },
  {
    path: '',
    redirectTo: 'portal',
    pathMatch: 'full',
  },
];
