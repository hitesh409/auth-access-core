import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    //layout for auth related pages
    {
        path: '',
        loadComponent : () => import('./features/auth/auth-layout/auth-layout').then(m => m.AuthLayout),
        children:[
            {
                path: '',
                loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
            },
            {
                path: 'login',
                canActivate: [guestGuard],
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
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
        import('./layout/main-layout/main-layout')
            .then(m => m.MainLayout),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                import('./features/dashboard/dashboard')
                    .then(m => m.Dashboard)
            }
        ]
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
