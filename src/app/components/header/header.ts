import { Component, inject, output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'header[app-header]',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userService = inject(UserService);
  toggle = output<void>();

  toggleMenu() {
    this.toggle.emit();
  }
}
