import { Routes } from '@angular/router';

export const routes: Routes = [
    //layout for auth related pages
    {
        path: '',
        loadComponent : () => import('./features/auth/auth-layout/auth-layout').then(m => m.AuthLayout),
        children:[
            {
                path: 'login',
                loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./features/auth/register/register')
                    .then(m => m.Register)
            },

            {
                path: 'forgot-password',
                loadComponent: () =>
                    import('./features/auth/forgot-password/forgot-password')
                    .then(m => m.ForgotPassword)
            }
        ]
    },

    // protected routes
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
    },

    // default route
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    // page not found route
    {
        path: 'page-not-found',
        loadComponent: () => import('./features/page-not-found/page-not-found').then(m => m.PageNotFound)
    },
    // wildcard route
    {
        path: '**',
        redirectTo: 'page-not-found'
    }
];
