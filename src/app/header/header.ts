import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userService = inject(UserService);

  toggleMenu() {
    // Logic to open/close the side navigation will go here
  }
}
