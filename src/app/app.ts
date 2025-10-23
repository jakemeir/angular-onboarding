import { Component, input } from '@angular/core';
import { Header } from './header/header';
import { Menu } from './menu/menu';
import { MainPage } from './main-page/main-page';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Header, Menu, MainPage],
})
export class App {
  isMenu: boolean = true;

  toggleMenu() {
    console.log('hello');

    this.isMenu = !this.isMenu;
  }
}
