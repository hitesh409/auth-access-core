import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../../../core/services/token.service';
import { Router } from '@angular/router';
import { LayoutService } from '../../../layout.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly layoutService = inject(LayoutService);


  isLoading = signal<boolean>(false);
  readonly currentUser = this.authService.currentUser;
  readonly fullName = computed(()=>{
    return this.currentUser() ? `${this.currentUser()?.firstName} ${this.currentUser()?.lastName}` : '';
  })
  readonly email = computed(()=>{
    return this.currentUser() ? this.currentUser()?.email : '';
  });

  logout() {
    this.isLoading.set(true);
    this.authService.logout().subscribe({
      next: () => {
        this.toastr.success('Logged out successfully', 'Logout');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.toastr.error('Logout failed', 'Error');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }
}
