import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthAPIsService } from '../../services/auth-apis.service';
import { AUTH_CONSTANTS } from '../../../../core/constants/auth.constants';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  errorMessage = '';
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authAPIsService = inject(AuthAPIsService);
  private readonly fb = inject(FormBuilder).nonNullable;

  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,64}$/,
        ),
      ],
    ],
    rememberMe: [false],
  });

  getControl(controlName: string) {
    return this.authForm.get(controlName);
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.authForm.valid) {
      const { rememberMe, ...loginData } = this.authForm.getRawValue();

      this.authAPIsService.login(loginData).subscribe({
        next: (res) => {
          this.authService.saveSession(res, rememberMe);
          this.router.navigate([AUTH_CONSTANTS.ROUTES.PROJECTS]);
        },
        error: (err) => {
          if (err.error.code === 'invalid_credentials') {
            this.errorMessage = AUTH_CONSTANTS.ERROR_MESSAGES.INVALID_CREDENTIALS;
          } else {
            this.errorMessage = AUTH_CONSTANTS.ERROR_MESSAGES.GENERIC_ERROR;
          }
        },
      });
    } else {
      this.authForm.markAllAsTouched();
    }
  }
}
