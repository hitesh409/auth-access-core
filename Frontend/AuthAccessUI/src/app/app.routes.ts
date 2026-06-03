import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  {
    path: '',
    loadChildren: () =>
      import('./layout/main-layout/main-layout.routes').then((m) => m.MAIN_LAYOUT_ROUTES),
  },

  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./features/page-not-found/page-not-found').then((m) => m.PageNotFound),
  },

  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/auth/unauthorized-page/unauthorized-page').then((m) => m.UnauthorizedPage),
  },

  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];
