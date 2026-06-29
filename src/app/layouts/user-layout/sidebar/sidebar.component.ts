import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AUTH_CONSTANTS } from '../../../core/constants/auth.constants';
import { AuthAPIsService } from '../../../features/auth/services/auth-apis.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly authApi = inject(AuthAPIsService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  @Input({ required: true })
  collapsed!: boolean;

  @Input({ required: true })
  mobileMenuOpen!: boolean;

  @Output()
  sidebarToggled = new EventEmitter<void>();

  @Output()
  mobileMenuClosed = new EventEmitter<void>();

  logout() {
    if (!this.authService.getToken()) {
      this.authService.clearSession();
      this.router.navigate([AUTH_CONSTANTS.ROUTES.LOGIN]);
      return;
    }

    this.authApi.logout().subscribe({
      next: () => {
        this.authService.clearSession();
        this.router.navigate([AUTH_CONSTANTS.ROUTES.LOGIN]);
      },
      error: (err) => {
        console.log(err.status);
        console.log(err.error);
      },
    });
  }

  closeMobileMenu() {
    this.mobileMenuClosed.emit();
  }
}
