import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./pages/sign-up/sign-up.component').then(
            (c) => c.SignUpComponent,
          ),
        title: 'Sign Up',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/log-in/log-in.component').then(
            (c) => c.LogInComponent,
          ),
        title: 'Login',
      },
    ],
  },
];
