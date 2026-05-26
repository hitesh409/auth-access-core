import { inject, Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { PermissionService } from "../auth/permission.service";

@Injectable({providedIn: 'root'})
export class AuthorizationService{
    private readonly authService = inject(AuthService);
    private readonly permissionService = inject(PermissionService);

    hasPermission(module: string, permission: number): boolean{
        return this.permissionService.hasPermission(module, permission);
    } 

    hasRole(role: string): boolean{
        const user = this.authService.currentUser();
        return user ? user.roles.includes(role) : false;
    }

    isAuthenticated(): boolean{
        return this.authService.isAuthenticated();
    }
    
    getCurrentUser(){
        return this.authService.currentUser();
    }
}