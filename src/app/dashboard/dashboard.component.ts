import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Welcome to your Dashboard!</h1>
        <button (click)="logout()" class="logout-btn">Logout</button>
      </div>
      
      <div class="dashboard-content">
        <div class="welcome-card">
          <h2>Registration Successful!</h2>
          <p>You have been automatically logged in.</p>
          @if (isAuthenticated) {
            <p class="auth-status">✅ You are authenticated</p>
          } @else {
            <p class="auth-status">❌ Not authenticated</p>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 1rem 2rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .dashboard-header h1 {
      color: #333;
      margin: 0;
    }

    .logout-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
    }

    .logout-btn:hover {
      background: #c0392b;
    }

    .dashboard-content {
      display: flex;
      justify-content: center;
    }

    .welcome-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 500px;
    }

    .welcome-card h2 {
      color: #333;
      margin-bottom: 1rem;
    }

    .welcome-card p {
      color: #666;
      margin-bottom: 1rem;
    }

    .auth-status {
      font-weight: bold;
      font-size: 1.1rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    
    // If not authenticated, redirect to register
    if (!this.isAuthenticated) {
      this.router.navigate(['/register']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/register']);
  }
}
