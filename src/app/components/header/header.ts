import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'header[app-header]',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  public authService = inject(AuthService);
  toggle = output<void>();

  toggleMenu() {
    this.toggle.emit();
  }

  logout() {
    this.authService.signOut();
  }
}
