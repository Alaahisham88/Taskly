import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../features/auth/services/auth-service.service';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthAPIsService } from '../../features/auth/services/auth-apis.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authApi = inject(AuthAPIsService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        apikey: environment.supabasekey,
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    req = req.clone({
      setHeaders: {
        apikey: environment.supabasekey,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403 && error.error?.error_code === 'bad_jwt') {
        const session = authService.getSession();
        const refreshToken = session?.refresh_token;
        if (!refreshToken) {
          return throwError(() => error);
        }

        return authApi
          .refreshToken({
            refresh_token: refreshToken,
          })
          .pipe(
            switchMap((response) => {
              console.log('Refresh Success', response);

              authService.saveSession(response);
              console.log('Saved Token:', authService.getToken());
              const newReq = req.clone({
                setHeaders: {
                  apikey: environment.supabasekey,
                  Authorization: `Bearer ${response.access_token}`,
                },
              });
              console.log(newReq.headers.get('Authorization'));
              console.log('REQUEST RETRIED');

              return next(newReq);
            }),
          );
      }

      return throwError(() => error);
    }),
  );
};
