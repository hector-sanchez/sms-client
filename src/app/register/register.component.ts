import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { email, password } = this.registerForm.value;

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
            console.log('Registration response:', response);

            const token =response.token;

            if (token) {
              // Store the JWT token
              this.authService.setToken(token);
              this.successMessage =
                'Registration successful! You are now logged in.';

              // Redirect to dashboard or home page after successful registration and auto-login
              setTimeout(() => {
                this.router.navigate(['/dashboard']); // or wherever you want to redirect
              }, 2000);
            } else {
              this.successMessage = 'Registration successful!';
              console.warn('No token received in response:', response);
            }

            this.registerForm.reset();
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Registration error:', error);

            // Handle CORS and other network errors
            if (error.status === 0) {
              this.errorMessage =
                'Network error: Please check if the server is running and CORS is configured properly.';
            } else if (error.status === 422) {
              this.errorMessage =
                error.error?.message ||
                'Validation error. Please check your input.';
            } else {
              this.errorMessage =
                error.error?.message ||
                'Registration failed. Please try again.';
            }
          },
        });
    }
  }
}
