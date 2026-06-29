import { Routes } from '@angular/router';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { loggedInCheckGuard } from './core/guards/logged-in-check.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [isLoggedInGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/user/user.routes').then((m) => m.USER_ROUTES),
    canActivate: [loggedInCheckGuard],
  },
];
