import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

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
