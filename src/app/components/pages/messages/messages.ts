import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AppConstants, getAuthHeader } from '../../../constants/app-constants';
import { NewMessageComponent } from './components/new-message/new-message';
import { MessagesListComponent } from './components/messages-list/messages-list';
import { Message } from './components/message/message';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, NewMessageComponent, MessagesListComponent],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  isLoading = true;
  errorMessage = '';
  currentUserId: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate([AppConstants.ROUTES.SIGNIN]);
      return;
    }

    // Get user ID from validated token
    this.currentUserId = this.authService.getUserId();

    if (!this.currentUserId) {
      this.errorMessage = AppConstants.ERROR_MESSAGES.USER_ID_MISSING;
      this.isLoading = false;
      return;
    }

    this.loadMessages();
  }

  private loadMessages() {
    if (!this.currentUserId) {
      this.errorMessage = AppConstants.ERROR_MESSAGES.USER_ID_MISSING;
      this.isLoading = false;
      return;
    }

    const headers = getAuthHeader(this.authService.getToken()!);

    this.http
      .get<any>(AppConstants.USER_ENDPOINTS.MESSAGES(this.currentUserId), {
        headers,
      })
      .subscribe({
        next: (response) => {
          // Handle different response structures
          let messages: Message[] = [];

          if (Array.isArray(response)) {
            messages = response;
          } else if (response && typeof response === 'object') {
            if (Array.isArray(response.messages)) {
              messages = response.messages;
            } else if (Array.isArray(response.data)) {
              messages = response.data;
            } else {
              this.errorMessage = AppConstants.ERROR_MESSAGES.GENERAL_ERROR;
              this.isLoading = false;
              return;
            }
          } else {
            this.errorMessage = AppConstants.ERROR_MESSAGES.GENERAL_ERROR;
            this.isLoading = false;
            return;
          }

          this.messages = messages.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;

          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate([AppConstants.ROUTES.SIGNIN]);
          } else if (error.status === 404) {
            this.errorMessage = AppConstants.ERROR_MESSAGES.MESSAGES_NOT_FOUND;
          } else if (error.status === 0) {
            this.errorMessage = AppConstants.ERROR_MESSAGES.NETWORK_ERROR;
          } else {
            this.errorMessage =
              error.error?.message || AppConstants.ERROR_MESSAGES.GENERAL_ERROR;
          }
        },
      });
  }

  refreshMessages() {
    this.isLoading = true;
    this.errorMessage = '';

    // Get user ID from validated token
    this.currentUserId = this.authService.getUserId();

    if (!this.currentUserId) {
      this.errorMessage = AppConstants.ERROR_MESSAGES.USER_ID_MISSING;
      this.isLoading = false;
      return;
    }

    this.loadMessages();
  }

  // Handler for when a message is sent from the new-message component
  onMessageSent(): void {
    // Refresh messages to show the new message
    this.loadMessages();
  }

  // Handler for when the messages-list component requests a refresh
  onRefreshRequested(): void {
    this.refreshMessages();
  }
}
