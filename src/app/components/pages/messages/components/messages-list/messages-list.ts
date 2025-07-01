import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent, Message } from '../message/message';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [CommonModule, MessageComponent],
  templateUrl: './messages-list.html',
  styleUrl: './messages-list.css',
})
export class MessagesListComponent {
  @Input() messages: Message[] = [];
  @Input() isLoading = false;
  @Input() errorMessage = '';
  @Output() refreshRequested = new EventEmitter<void>();

  refreshMessages(): void {
    this.refreshRequested.emit();
  }

  getMaxMessageLength(): number {
    return 250; // This could be moved to a constants file if needed
  }
}
