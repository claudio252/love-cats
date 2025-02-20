import { Routes } from '@angular/router';

const votingRoutes: Routes = [
  {
    path: 'voting',
    loadChildren: () =>
      import('./components/voting/voting.routes').then((m) => m.routes),
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'voting/portal',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/blank/blank.component').then(
        (m) => m.BlankComponent
      ),
    children: [
      {
        path: 'others',
        loadChildren: () =>
          import('./components/others/others.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/main/main.component').then(
        (m) => m.MainComponent
      ),
    children: votingRoutes,
  },

  {
    path: '**',
    redirectTo: 'others/404',
  },
];