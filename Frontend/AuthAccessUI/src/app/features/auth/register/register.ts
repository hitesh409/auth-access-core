import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../../shared/ui/components/button/button';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule, RouterLink, ButtonComponent],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  submitted: boolean = false;
  activeErrorField : 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword' | null = null;
  isLoading = signal<boolean>(false);

  constructor(private authService: AuthService, private toastr: ToastrService, private router : Router) {}

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      const firstName = this.registerForm.get('firstName');
      const lastName = this.registerForm.get('lastName');
      const email = this.registerForm.get('email');
      const password = this.registerForm.get('password');
      const confirmPassword = this.registerForm.get('confirmPassword');
      
      // Email format validation
      if (email?.errors?.['email']) {
        this.activeErrorField = 'email';
        this.toastr.error('Invalid email format', 'Login Failed');
        return;
      }
      // Required validation
      if (firstName?.errors?.['required'] || lastName?.errors?.['required'] || email?.errors?.['required'] || password?.errors?.['required'] || confirmPassword?.errors?.['required']) {
        this.activeErrorField = null; // highlight all
        this.toastr.error('All required fields must be filled', 'Login Failed');
        return;
      }
      // Password match validation
      if(password?.value !== confirmPassword?.value){
        this.activeErrorField = 'confirmPassword';
        this.toastr.error('Passwords do not match', 'Registration Failed');
        return;
      }
      
      this.activeErrorField = null;
    }
    this.isLoading.set(true);
    this.authService.register(this.registerForm.value).subscribe({
          next: (res: any) => {
            this.toastr.success('Registration successful', 'Welcome!');
            this.isLoading.set(false);
            this.router.navigate(['/auth/login']);
          },
          error: (ex: any) => {
            this.isLoading.set(false);
            if(ex.status === 409){
              this.toastr.error('Email already exists', 'Registration Failed');
              this.activeErrorField = 'email';
              return;
            }
            this.toastr.error('Invalid credentials', 'Registration Failed');
          }
        });
    
  }


}
