import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  currentRoute = '';
  private routerSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAuthStatus();
    this.getCurrentRoute();

    // Subscribe to router events to update current route
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        // Check auth status on route changes in case it changed
        this.checkAuthStatus();
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private checkAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  private getCurrentRoute() {
    this.currentRoute = this.router.url;
  }

  goHome() {
    if (this.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/signin']);
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToMessages() {
    this.router.navigate(['/messages']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
    this.checkAuthStatus();
  }
}
