import { inject, Injectable, signal } from '@angular/core';
import { LogInResponse } from '../models/logIn.interface';
import {
  LocalStorageService,
  SessionStorageService,
} from '../../../core/services/storage.service';
import { AUTH_CONSTANTS } from '../../../core/constants/auth.constants';
import { User } from '../../../core/models/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | null>(null);
  private readonly localStorage = inject(LocalStorageService);
  private readonly sessionStorage = inject(SessionStorageService);

  saveSession(session: LogInResponse, rememberMe = false) {
    const storage = rememberMe ? this.localStorage : this.sessionStorage;

    storage.setItem(
      AUTH_CONSTANTS.STORAGE_KEYS.SESSION,
      JSON.stringify(session),
    );
    this.currentUser.set(session.user);
  }

  getSession(): LogInResponse | null {
    const session =
      this.localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.SESSION) ??
      this.sessionStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.SESSION);

    if (!session) {
      return null;
    }

    try {
      return JSON.parse(session);
    } catch (error) {
      console.error('Failed to parse session data:', error);
      this.clearSession();
      return null;
    }
  }

  getToken(): string | null {
    return this.getSession()?.access_token ?? null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setCurrentUser(user: User) {
    this.currentUser.set(user);
  }

  initializeUserFromSession() {
    const session = this.getSession();
    if (session?.user) {
      this.currentUser.set(session.user);
    }
  }

  clearSession() {
    this.localStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.SESSION);
    this.sessionStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.SESSION);
    document.cookie =
      'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.currentUser.set(null);
  }
}
