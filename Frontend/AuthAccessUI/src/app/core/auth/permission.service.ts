import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class PermissionService{
    private permissions = new Map<string,number>();

    setPermissions(permissions: string[]){
        this.permissions.clear();
        permissions.forEach(p=>{
            const [module, value] = p.split(':');
            this.permissions.set(module,Number(value));
        });
    }

    hasPermission(module: string, required: number): boolean{
        const value = this.permissions.get(module);
        if(value === undefined) return false;
        return (value & required) === required;
    }

    clearPermissions(){
        this.permissions.clear();
    }
}