/**
 * Application Constants
 *
 * Centralized configuration for API endpoints, application settings,
 * and other constant values used throughout the application.
 */

export class AppConstants {
  // API Base Configuration
  static readonly API_BASE_URL = 'http://localhost:3000';
  // 'https://sms-api-1751415465-612b91c224a7.herokuapp.com';

  // Authentication Endpoints
  static readonly AUTH_ENDPOINTS = {
    REGISTER: `${this.API_BASE_URL}/users`,
    LOGIN: `${this.API_BASE_URL}/auths`,
  } as const;

  // User Endpoints
  static readonly USER_ENDPOINTS = {
    MESSAGES: (userId: string) =>
      `${this.API_BASE_URL}/users/${userId}/messages`,
    SEND_MESSAGE: (userId: string) =>
      `${this.API_BASE_URL}/users/${userId}/messages`,
  } as const;

  // Message Endpoints
  static readonly MESSAGE_ENDPOINTS = {
    SEND: `${this.API_BASE_URL}/messages`,
  } as const;

  // Application Settings
  static readonly APP_SETTINGS = {
    MAX_MESSAGE_LENGTH: 250,
    TOKEN_STORAGE_KEY: 'jwt_token',
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    DEFAULT_PHONE_NUMBER: '+18777804236',
  } as const;

  // Form Validation Patterns
  static readonly VALIDATION_PATTERNS = {
    PHONE_NUMBER: /^\+?[1-9]\d{1,14}$/, // Basic international phone number pattern
  } as const;

  // HTTP Headers
  static readonly HTTP_HEADERS = {
    CONTENT_TYPE: 'application/json',
    AUTHORIZATION: 'Authorization',
    BEARER_PREFIX: 'Bearer',
  } as const;

  // Route Paths
  static readonly ROUTES = {
    HOME: '/',
    SIGNIN: '/signin',
    REGISTER: '/register',
    MESSAGES: '/messages',
  } as const;

  // Error Messages
  static readonly ERROR_MESSAGES = {
    AUTHENTICATION_FAILED:
      'Authentication failed. Please check your credentials.',
    NETWORK_ERROR:
      'Network error: Please check your internet connection and ensure the API server is accessible.',
    CORS_ERROR:
      'CORS error: The API server may not be configured to accept requests from this domain.',
    INVALID_TOKEN: 'Invalid authentication token. Please sign in again.',
    MESSAGES_NOT_FOUND: 'Messages not found for this user.',
    GENERAL_ERROR: 'An unexpected error occurred. Please try again.',
    USER_ID_MISSING:
      'Unable to get user ID from authentication token. Please sign in again.',
  } as const;

  // Success Messages
  static readonly SUCCESS_MESSAGES = {
    REGISTRATION_SUCCESS:
      'Registration successful! Welcome to MySMS Messenger.',
    LOGIN_SUCCESS: 'Login successful! Welcome back.',
    MESSAGE_SENT: 'Message sent successfully!',
  } as const;
}

/**
 * Helper function to get authorization header with Bearer token
 */
export function getAuthHeader(token: string): { [key: string]: string } {
  return {
    'Content-Type': AppConstants.HTTP_HEADERS.CONTENT_TYPE,
    [AppConstants.HTTP_HEADERS
      .AUTHORIZATION]: `${AppConstants.HTTP_HEADERS.BEARER_PREFIX} ${token}`,
  };
}

/**
 * Helper function to build API URLs with parameters
 */
export function buildApiUrl(
  baseUrl: string,
  params: Record<string, string | number> = {}
): string {
  let url = baseUrl;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`{${key}}`, String(value));
  });
  return url;
}
