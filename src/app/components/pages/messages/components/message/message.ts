import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class MessageComponent {
  @Input({ required: true }) message!: Message;

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

  getMaxMessageLength(): number {
    return 250; // This could be moved to a constants file if needed
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
}
