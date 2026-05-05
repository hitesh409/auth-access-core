import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { TokenService } from '../../../core/services/token.service';
import { JwtService } from '../../../core/auth/jwt.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private tokenService: TokenService,
    private jwtService: JwtService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  hidePassword: boolean = true
  submitted: boolean = false
  activeErrorField : 'email' | 'password' | null = null;
  isLoading = signal<boolean>(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  togglePassword(){
    this.hidePassword = !this.hidePassword;
  }

  onLogin() {
    this.submitted = true;
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      const email = this.loginForm.get('email');
      const password = this.loginForm.get('password');
      
      // Email format validation
      if (email?.errors?.['email']) {
        this.activeErrorField = 'email';
        this.toastr.error('Invalid email format', 'Login Failed');
        return;
      }
      // Required validation
      if (email?.errors?.['required'] || password?.errors?.['required']) {
        this.activeErrorField = null; // highlight all
        this.toastr.error('All required fields must be filled', 'Login Failed');
        return;
      }
      
      this.activeErrorField = null;
    }

    this.isLoading.set(true);

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.tokenService.setToken(res.accessToken);

        const decoded = this.jwtService.decodeToken(res.accessToken);
        this.permissionService.setPermissions(decoded.permissions);

        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastr.error('Invalid credentials', 'Login Failed');
      }
    });
  }
}
