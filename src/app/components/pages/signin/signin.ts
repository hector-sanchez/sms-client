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
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  template: `
    <app-auth-form
      [config]="formConfig"
      [isSubmitting]="isSubmitting"
      [errorMessage]="errorMessage"
      [successMessage]="successMessage"
      (formSubmit)="onFormSubmit($event)"
      (switchMode)="onSwitchToRegister()"
    >
    </app-auth-form>
  `,
})
export class SignInComponent {
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  formConfig: AuthFormConfig = {
    title: 'Sign In',
    submitButtonText: 'Sign In',
    submitButtonLoadingText: 'Signing In...',
    showConfirmPassword: false,
    showSwitchLink: true,
    switchLinkLabel: "Don't have an account?",
    switchLinkText: 'Register',
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

    // Assuming your Rails backend has a sign-in endpoint at /auth/signin or /sessions
    this.http
      .post<{
        token?: string;
        jwt?: string;
        access_token?: string;
        user?: any;
      }>('http://localhost:3000/auths', { email, password }, { headers })
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;

          const token = response.token || response.jwt || response.access_token;

          if (token) {
            // Store and validate the JWT token
            const tokenValid = this.authService.setToken(token);

            if (tokenValid) {
              this.successMessage = 'Sign-in successful! Welcome back.';

              // Redirect to dashboard after successful sign-in
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 1500);
            } else {
              this.errorMessage = 'Sign-in successful, but received an invalid authentication token. Please contact support.';
            }
          } else {
            this.errorMessage = 'Sign-in successful but no authentication token received. Please contact support.';
          }
        },
        error: (error) => {
          this.isSubmitting = false;

          // Handle different error scenarios
          if (error.status === 0) {
            this.errorMessage =
              'Network error: Please check if the server is running and CORS is configured properly.';
          } else if (error.status === 401) {
            this.errorMessage = 'Invalid email or password. Please try again.';
          } else if (error.status === 422) {
            this.errorMessage =
              error.error?.message ||
              'Validation error. Please check your input.';
          } else {
            this.errorMessage =
              error.error?.message || 'Sign-in failed. Please try again.';
          }
        },
      });
  }

  onSwitchToRegister() {
    this.router.navigate(['/register']);
  }
}
