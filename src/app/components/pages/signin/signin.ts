import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AppConstants } from '../../../constants/app-constants';
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
      'Content-Type': AppConstants.HTTP_HEADERS.CONTENT_TYPE,
      Accept: AppConstants.HTTP_HEADERS.CONTENT_TYPE,
    });

    // Assuming your Rails backend has a sign-in endpoint at /auth/signin or /sessions
    this.http
      .post<{
        token?: string;
        jwt?: string;
        access_token?: string;
        user?: any;
      }>(AppConstants.AUTH_ENDPOINTS.LOGIN, { email, password }, { headers })
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;

          const token = response.token || response.jwt || response.access_token;

          if (token) {
            // Store and validate the JWT token
            const tokenValid = this.authService.setToken(token);

            if (tokenValid) {
              this.successMessage = AppConstants.SUCCESS_MESSAGES.LOGIN_SUCCESS;

              // Redirect to messages after successful sign-in
              setTimeout(() => {
                this.router.navigate([AppConstants.ROUTES.MESSAGES]);
              }, 1500);
            } else {
              this.errorMessage =
                'Sign-in successful, but received an invalid authentication token. Please contact support.';
            }
          } else {
            this.errorMessage =
              'Sign-in successful but no authentication token received. Please contact support.';
          }
        },
        error: (error) => {
          this.isSubmitting = false;

          // Handle different error scenarios
          if (error.status === 0) {
            this.errorMessage = AppConstants.ERROR_MESSAGES.NETWORK_ERROR;
          } else if (error.status === 401) {
            this.errorMessage =
              AppConstants.ERROR_MESSAGES.AUTHENTICATION_FAILED;
          } else if (error.status === 422) {
            this.errorMessage =
              error.error?.message ||
              'Validation error. Please check your input.';
          } else {
            this.errorMessage =
              error.error?.message || AppConstants.ERROR_MESSAGES.GENERAL_ERROR;
          }
        },
      });
  }

  onSwitchToRegister() {
    this.router.navigate([AppConstants.ROUTES.REGISTER]);
  }
}
