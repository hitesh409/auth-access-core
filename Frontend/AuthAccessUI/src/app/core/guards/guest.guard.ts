// PREVENT ACCESS TO LOGIN WHEN ALREADY AUTHENTICATED
import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { TokenService } from "../services/token.service";

export const guestGuard: CanActivateChildFn = () => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    const token = tokenService.getToken();
    if(token){
        return router.createUrlTree(['/dashboard']);
    }

    return true;
}