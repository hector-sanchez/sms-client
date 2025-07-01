import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {
  AuthFormComponent,
  AuthFormData,
  AuthFormConfig,
} from '../../shared/auth-form/auth-form';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  template: `
    <app-auth-form
      [config]="formConfig"
      [isSubmitting]="isSubmitting"
      [errorMessage]="errorMessage"
      [successMessage]="successMessage"
      (formSubmit)="onFormSubmit($event)"
      (switchMode)="onSwitchToSignIn()"
    >
    </app-auth-form>
  `,
})
export class RegisterComponent {
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  formConfig: AuthFormConfig = {
    title: 'Create Account',
    submitButtonText: 'Create Account',
    submitButtonLoadingText: 'Creating Account...',
    showConfirmPassword: true,
    showSwitchLink: true,
    switchLinkLabel: 'Already have an account?',
    switchLinkText: 'Sign In',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onFormSubmit(formData: AuthFormData) {
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { email, password } = formData;

    // Set up headers for the request
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    this.http
      .post<{
        token?: string;
        jwt?: string;
        access_token?: string;
        user?: any;
      }>('http://localhost:3000/users', { email, password }, { headers })
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;

          const token = response.token;

          if (token) {
            // Store and validate the JWT token
            const tokenValid = this.authService.setToken(token);

            if (tokenValid) {
              this.successMessage =
                'Registration successful! You are now logged in.';

              // Redirect to dashboard after successful registration and auto-login
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 2000);
            } else {
              this.errorMessage =
                'Registration successful, but received an invalid authentication token. Please try signing in.';
            }
          } else {
            this.errorMessage =
              'Registration successful, but no authentication token was received. Please try signing in.';
          }
        },
        error: (error) => {
          this.isSubmitting = false;

          // Handle network errors
          if (error.status === 0) {
            this.errorMessage =
              'Network error: Please check if the server is running and CORS is configured properly.';
          } else if (error.status === 422) {
            this.errorMessage =
              error.error?.message ||
              'Validation error. Please check your input.';
          } else {
            this.errorMessage =
              error.error?.message || 'Registration failed. Please try again.';
          }
        },
      });
  }

  onSwitchToSignIn() {
    this.router.navigate(['/signin']);
  }
}
