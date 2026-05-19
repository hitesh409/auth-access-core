import { Component, signal } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../../../core/services/token.service';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    private layoutService : LayoutService
  ) {}

  isLoading = signal<boolean>(false);


  logout() {
    this.isLoading.set(true);
    this.authService.logout().subscribe({
      next: () => {
        this.toastr.success('Logged out successfully', 'Logout');
        this.tokenService.clearToken();
        this.router.navigate(['/login']);
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
