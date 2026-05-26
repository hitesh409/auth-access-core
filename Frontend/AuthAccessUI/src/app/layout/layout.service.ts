import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LayoutService {
    isSidebarCollapsed = signal<boolean>(false);
    isMobileSidebarOpen = signal<boolean>(false);

     toggleSidebar(): void {
        this.isSidebarCollapsed.update(value => !value);
    }

    toggleMobileSidebar(): void {
        this.isMobileSidebarOpen.update(value => !value);
    }

    closeMobileSidebar(): void {
        this.isMobileSidebarOpen.set(false);
    }
}