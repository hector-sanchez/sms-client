import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

export interface Message {
  id: number;
  body: string;
  phone_number: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  created_at: string;
  updated_at: string;
  user_id: number;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
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
      this.router.navigate(['/signin']);
      return;
    }

    // Get user ID from validated token
    this.currentUserId = this.authService.getUserId();

    if (!this.currentUserId) {
      this.errorMessage =
        'Unable to get user ID from authentication token. Please sign in again.';
      this.isLoading = false;
      return;
    }

    this.loadMessages();
  }

  private loadMessages() {
    if (!this.currentUserId) {
      this.errorMessage = 'User ID not available.';
      this.isLoading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    this.http
      .get<any>(`http://localhost:3000/users/${this.currentUserId}/messages`, {
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
              this.errorMessage = 'Invalid response format from server.';
              this.isLoading = false;
              return;
            }
          } else {
            this.errorMessage = 'Invalid response format from server.';
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
            this.router.navigate(['/signin']);
          } else if (error.status === 404) {
            this.errorMessage = 'Messages not found for this user.';
          } else if (error.status === 0) {
            this.errorMessage =
              'Network error: Please check if the server is running.';
          } else {
            this.errorMessage =
              error.error?.message || 'Failed to load messages.';
          }
        },
      });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'sent':
        return '#10b981'; // green
      case 'delivered':
        return '#3b82f6'; // blue
      case 'pending':
        return '#f59e0b'; // amber
      case 'failed':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'pending':
        return '⏳';
      case 'failed':
        return '✗';
      default:
        return '?';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  }
  formatUTCDate(dateString: string): string {
    const date = new Date(dateString);

    // Format date part as full date
    const fullDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Format time part as UTC
    const utcHours = String(date.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(date.getUTCMinutes()).padStart(2, '0');
    const utcTime = `${utcHours}:${utcMinutes} UTC`;

    return `${fullDate} ${utcTime}`;
  }

  refreshMessages() {
    this.isLoading = true;
    this.errorMessage = '';

    // Get user ID from validated token
    this.currentUserId = this.authService.getUserId();

    if (!this.currentUserId) {
      this.errorMessage =
        'Unable to get user ID from authentication token. Please sign in again.';
      this.isLoading = false;
      return;
    }

    this.loadMessages();
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
