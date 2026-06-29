import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterOutlet,
    BottomNavComponent,
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent {
  readonly collapsed = signal(false);
  readonly mobileMenuOpen = signal(false);

  toggleSidebar() {
    this.collapsed.update((v) => !v);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }
}
