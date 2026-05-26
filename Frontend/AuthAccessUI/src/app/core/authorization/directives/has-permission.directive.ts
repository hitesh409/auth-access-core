import { Directive, effect, inject, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthorizationService } from "../authorization.service";

@Directive({
    selector: '[appHasPermission]',
    standalone: true
})

export class HasPermissionDirective {
    private readonly templateRef = inject(TemplateRef<any>);
    private readonly viewContainer = inject(ViewContainerRef);
    private readonly authorizationService = inject(AuthorizationService);

    private _module: string = '';
    private _permission: number = 0;

    @Input() set appHasPermission(value: [string, number]) {
        this._module = value[0];
        this._permission = value[1];
        this.updateView();
    }
    
    constructor() {
        //logout updates UI
        //session hydration updates UI
        //permission changes update UI
        effect(() => {
            this.authorizationService.getCurrentUser(); // Track user changes
            this.updateView();
        });
    }

    private updateView() {
        const hasPermission = this.authorizationService.hasPermission(this._module, this._permission);
        this.viewContainer.clear();
        if (hasPermission) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}