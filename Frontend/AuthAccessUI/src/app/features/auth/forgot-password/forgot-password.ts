import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../../../shared/ui/components/button/button';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterLink, ButtonComponent],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  private fb = inject(FormBuilder);
  submitted: boolean = false;
  activeErrorField : 'email' | null = null;
  isLoading = signal<boolean>(false);

  constructor() {}

  forgotPasswordForm = this.fb.group({
    email: [''],
  });

  onSubmit() {
    this.submitted = true;
    if(this.forgotPasswordForm.invalid){
      this.forgotPasswordForm.markAllAsTouched();
      const email = this.forgotPasswordForm.get('email');
      
      // Email format validation
      if (email?.errors?.['email']) {
        this.activeErrorField = 'email';
        return;
      }
      // Required validation
      if (email?.errors?.['required']) {
        this.activeErrorField = null; // highlight all
        return;
      }
    }
    this.isLoading.set(true);
  }

}
