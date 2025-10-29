import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'header[app-header]',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  userService = inject(UserService);
  toggle = output<void>();

  toggleMenu() {
    this.toggle.emit();
  }
}
