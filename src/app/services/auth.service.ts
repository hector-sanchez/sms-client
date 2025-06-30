import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';

  constructor() { }

  // Store the JWT token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get the JWT token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove the JWT token
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Check if token is expired (assuming JWT format with payload)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      // If token parsing fails, consider it invalid
      return false;
    }
  }

  // Get the Authorization header for HTTP requests
  getAuthHeader(): { [key: string]: string } {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Logout user
  logout(): void {
    this.removeToken();
  }
}
