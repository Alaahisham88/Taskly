import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import {
  LogInRequest,
  LogInResponse,
  RefreshTokenRequest,
} from '../models/logIn.interface';
import { SignUpRequest, SignUpResponse } from '../models/signUp.interface';
import { User } from '../../../core/models/user.models';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIsService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  signUp(data: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(
      environment.apiUrl + '/auth/v1/signup',
      data,
    );
  }

  login(data: LogInRequest): Observable<LogInResponse> {
    return this.http.post<LogInResponse>(
      environment.apiUrl + '/auth/v1/token?grant_type=password',
      data,
    );
  }

  logout() {
    return this.http.post(environment.apiUrl + '/auth/v1/logout', {});
  }

  refreshToken(data: RefreshTokenRequest): Observable<LogInResponse> {
    return this.http.post<LogInResponse>(
      environment.apiUrl + '/auth/v1/token?grant_type=refresh_token',
      data,
    );
  }

  getUserData(): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/auth/v1/user');
  }
}
