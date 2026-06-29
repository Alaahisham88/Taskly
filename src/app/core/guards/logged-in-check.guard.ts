import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth-service.service';
import { inject } from '@angular/core';
import { AUTH_CONSTANTS } from '../../core/constants/auth.constants';

export const loggedInCheckGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate([AUTH_CONSTANTS.ROUTES.LOGIN]);
    return false;
  }
};
