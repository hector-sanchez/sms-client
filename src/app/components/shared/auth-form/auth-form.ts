import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthFormConfig {
  title: string;
  submitButtonText: string;
  submitButtonLoadingText: string;
  showConfirmPassword: boolean;
  showSwitchLink: boolean;
  switchLinkText?: string;
  switchLinkLabel?: string;
}

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.css',
})
export class AuthFormComponent implements OnInit, OnChanges {
  @Input() config!: AuthFormConfig;
  @Input() isSubmitting = false;
  @Input() errorMessage = '';
  @Input() successMessage = '';

  @Output() formSubmit = new EventEmitter<AuthFormData>();
  @Output() switchMode = new EventEmitter<void>();

  authForm: FormGroup;
  isAuthenticated = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    });
  }

  ngOnInit() {
    this.checkAuthStatus();
    this.updateFormValidation();
  }

  ngOnChanges() {
    this.updateFormValidation();
  }

  private checkAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  private updateFormValidation() {
    const confirmPasswordControl = this.authForm.get('confirmPassword');

    if (this.config?.showConfirmPassword) {
      confirmPasswordControl?.setValidators([Validators.required]);
      this.authForm.setValidators(this.passwordMatchValidator);
    } else {
      confirmPasswordControl?.clearValidators();
      this.authForm.clearValidators();
    }

    confirmPasswordControl?.updateValueAndValidity();
    this.authForm.updateValueAndValidity();
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
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password');
  }
  get confirmPassword() {
    return this.authForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.authForm.valid) {
      const formData: AuthFormData = {
        email: this.authForm.value.email,
        password: this.authForm.value.password,
      };

      if (this.config.showConfirmPassword) {
        formData.confirmPassword = this.authForm.value.confirmPassword;
      }

      this.formSubmit.emit(formData);
    }
  }

  onSwitchMode() {
    this.switchMode.emit();
  }

  resetForm() {
    this.authForm.reset();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
    this.checkAuthStatus(); // Refresh the auth status
  }
}
