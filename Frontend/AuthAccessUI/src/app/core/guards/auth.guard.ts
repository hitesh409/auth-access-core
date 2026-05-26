import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

export const authGuard: CanActivateFn = (route, state)=>{
    const authService = inject(AuthService);
    const router = inject(Router);
    const isAuthenticated  = authService.isAuthenticated();
    if(isAuthenticated ){
        return true;
    }

    // Preserve attempted URL for redirect after login
    return router.createUrlTree(['/auth/login'],{
        queryParams: { returnUrl: state.url }
    });
}