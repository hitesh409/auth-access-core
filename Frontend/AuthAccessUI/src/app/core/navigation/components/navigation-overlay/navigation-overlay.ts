import { Component, inject, HostListener } from '@angular/core';
import { NavigationOverlayService } from '../../navigation-overlay.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation-overlay',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './navigation-overlay.html',
  styleUrl: './navigation-overlay.scss',
})
export class NavigationOverlay {
  readonly overlayService = inject(NavigationOverlayService);
  private readonly router = inject(Router);
  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.overlayService.close();
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.overlayService.close();
  }

  get parent() {
    return this.overlayService.currentParent;
  }
}
