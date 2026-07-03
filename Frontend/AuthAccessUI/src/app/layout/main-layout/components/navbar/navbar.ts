import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../../core/auth/auth.service';
import { LayoutService } from '../../../../core/layout/layout.service';
import { faBars, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../../../../shared/ui/components/button/button';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  readonly layoutService = inject(LayoutService);

  protected readonly faBars = faBars;
  protected readonly faRightToBracket = faRightToBracket;

  readonly currentUser = this.authService.currentUser;
  readonly fullName = computed(() => {
    const user = this.currentUser();
    if (!user) {
      return '';
    }
    return `${user.firstName} ${user.lastName}`;
  });

  readonly email = computed(() => {
    const user = this.currentUser();
    return user?.email ?? '';
  });

  readonly isLoading = signal(false);

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  logout(): void {
    this.isLoading.set(true);
    this.authService.logout().subscribe({
      next: () => {
        this.toastr.success('Logged out successfully', 'Logout');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.toastr.error('Logout failed', 'Error');
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
