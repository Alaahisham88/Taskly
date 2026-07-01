import {
  Component,
  computed,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { AuthAPIsService } from '../../../features/auth/services/auth-apis.service';
import { AuthService } from '../../../features/auth/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly authapiService = inject(AuthAPIsService);

  readonly currentUser = this.authService.currentUser;

  readonly userInitials = computed(() => {
    const user = this.currentUser();
    if (!user?.user_metadata?.name) return 'U';

    const name = user.user_metadata.name;
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  });

  readonly userName = computed(
    () => this.currentUser()?.user_metadata?.name || 'User',
  );

  readonly userTitle = computed(
    () => this.currentUser()?.user_metadata?.department || 'Team Member',
  );

  @Output()
  mobileMenuToggled = new EventEmitter<void>();
}
