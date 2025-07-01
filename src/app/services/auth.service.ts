import { Injectable } from '@angular/core';
import { AppConstants } from '../constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = AppConstants.APP_SETTINGS.TOKEN_STORAGE_KEY;

  constructor() {}

  // Store the JWT token with validation
  setToken(token: string): boolean {
    if (!token) {
      return false;
    }

    // Validate token format
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return false;
    }

    try {
      // Validate payload can be parsed
      const payload = JSON.parse(atob(tokenParts[1]));

      // Check if user_id exists
      if (!payload.user_id) {
        return false;
      }

      // Check if token is not expired
      if (payload.exp && payload.exp <= Math.floor(Date.now() / 1000)) {
        return false;
      }

      // Store the token only if validation passes
      localStorage.setItem(this.tokenKey, token);
      return true;
    } catch (error) {
      return false;
    }
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
    return token
      ? {
          [AppConstants.HTTP_HEADERS.AUTHORIZATION]: `${AppConstants.HTTP_HEADERS.BEARER_PREFIX} ${token}`,
          [AppConstants.HTTP_HEADERS.CONTENT_TYPE]: AppConstants.HTTP_HEADERS.CONTENT_TYPE
        }
      : {};
  }

  // Get user ID from JWT token (assumes token is already validated)
  getUserId(): string | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      // Since token was validated when stored, we can safely parse it
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id || null;
    } catch (error) {
      // This should rarely happen since token was validated when stored
      // Remove invalid token
      this.removeToken();
      return null;
    }
  }

  // Logout user
  logout(): void {
    this.removeToken();
  }
}
