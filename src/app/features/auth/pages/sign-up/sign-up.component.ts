import { Component, inject } from '@angular/core';
import { AuthAPIsService } from '../../services/auth-apis.service';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { AUTH_CONSTANTS } from '../../../../core/constants/auth.constants';
import { SignUpRequest } from '../../models/signUp.interface';
import { LogInResponse } from '../../models/logIn.interface';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authAPIsService = inject(AuthAPIsService);
  private readonly fb = inject(FormBuilder);

  authForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^(?!.*\s{2,})[\p{L}]+(?:\s[\p{L}]+)*$/u),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      title: [''],
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
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.checkPasswordValidators },
  );

  get passwordValue(): string {
    return this.getControl('password')?.value ?? '';
  }

  passwordRules = [
    {
      label: 'At least 8 characters',
      test: (v: string) => v.length >= 8,
    },
    {
      label: 'One uppercase letter, One lowercase letter, One digit',
      test: (v: string) => /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v),
    },

    {
      label: 'One special character',
      test: (v: string) => /[!@#$%^&*]/.test(v),
    },
    {
      label: 'No spaces',
      test: (v: string) => !/\s/.test(v),
    },
  ];

  getControl(controlName: string) {
    return this.authForm.get(controlName);
  }
  checkPasswordValidators(control: AbstractControl) {
    return control.get('password')?.value ==
      control.get('confirmPassword')?.value
      ? null
      : {
          mismatch: true,
        };
  }

  onSubmit() {
    if (this.authForm.valid) {
      const formValue = this.authForm.getRawValue();
      const signUpData: SignUpRequest = {
        email: formValue.email || '',
        password: formValue.password || '',
        data: {
          name: formValue.name || '',
          department: formValue.title || '',
        },
      };

      this.authAPIsService.signUp(signUpData).subscribe({
        next: (res) => {
          this.authService.saveSession(res as LogInResponse);
          this.router.navigate([AUTH_CONSTANTS.ROUTES.PROJECTS]);
        },
        error: (error) => {
          console.error('Sign up error:', error);
        },
      });
    } else {
      this.authForm.markAllAsTouched();
    }
  }
}
