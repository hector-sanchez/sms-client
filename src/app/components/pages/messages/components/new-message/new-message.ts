import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import {
  AppConstants,
  getAuthHeader,
} from '../../../../../constants/app-constants';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-message.html',
  styleUrl: './new-message.css',
})
export class NewMessageComponent {
  @Output() messageSent = new EventEmitter<void>();

  // Form-related properties
  messageForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  formErrorMessage = '';
  characterCount = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    // Initialize the form
    this.messageForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+?[1-9]\d{1,14}$/), // Basic international phone number pattern
        ],
      ],
      messageBody: [
        '',
        [
          Validators.required,
          Validators.maxLength(AppConstants.APP_SETTINGS.MAX_MESSAGE_LENGTH),
        ],
      ],
    });
  }

  getMaxMessageLength(): number {
    return AppConstants.APP_SETTINGS.MAX_MESSAGE_LENGTH;
  }

  updateCharacterCount(): void {
    const messageBody = this.messageForm.get('messageBody')?.value || '';
    this.characterCount = messageBody.length;
  }

  clearForm(): void {
    this.messageForm.reset();
    this.characterCount = 0;
    this.successMessage = '';
    this.formErrorMessage = '';
  }

  onSubmit(): void {
    if (this.messageForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.formErrorMessage = '';

    const formData = this.messageForm.value;
    const messageData = {
      to: formData.phoneNumber,
      body: formData.messageBody,
    };

    const headers = getAuthHeader(this.authService.getToken()!);

    this.http
      .post<any>('http://localhost:3000/messages', messageData, { headers })
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.successMessage = AppConstants.SUCCESS_MESSAGES.MESSAGE_SENT;
          this.clearForm();

          // Emit event to parent component to refresh messages
          this.messageSent.emit();
        },
        error: (error) => {
          this.isSubmitting = false;

          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate([AppConstants.ROUTES.SIGNIN]);
          } else if (error.status === 0) {
            this.formErrorMessage = AppConstants.ERROR_MESSAGES.NETWORK_ERROR;
          } else {
            this.formErrorMessage =
              error.error?.message || AppConstants.ERROR_MESSAGES.GENERAL_ERROR;
          }
        },
      });
  }
}
