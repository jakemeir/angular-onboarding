import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [Header, Menu, RouterModule],
})
export class App {
  isMenu: boolean = true;

  toggleMenu() {
    console.log('hello');

    this.isMenu = !this.isMenu;
  }
}
