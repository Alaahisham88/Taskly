import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AUTH_CONSTANTS } from '../../../core/constants/auth.constants';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
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
    this.authService.clearSession();
    this.router.navigate([AUTH_CONSTANTS.ROUTES.LOGIN]);
  }

  closeMobileMenu() {
    this.mobileMenuClosed.emit();
  }
}
