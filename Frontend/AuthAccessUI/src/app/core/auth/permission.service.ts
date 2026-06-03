import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})

export class PermissionService{
    private permissionsMapSignal = signal<Map<string,number>>(new Map());
    readonly permissionsMap = this.permissionsMapSignal.asReadonly();

    setPermissions(permissions: string[]){
        const map = new Map<string,number>();
        permissions.forEach(p=>{
            const [module, value] = p.split(':');
            map.set(module.trim(),Number(value));
        });
        this.permissionsMapSignal.set(map);
    }

    hasPermission(module: string, required: number): boolean{
        const value = this.permissionsMapSignal().get(module);
        if(value === undefined) return false;
        return (value & required) === required;
    }

    clearPermissions(){
        this.permissionsMapSignal.set(new Map());
    }
}