import { Component, inject, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { RouterModule } from '@angular/router';
import { ErrorService } from './services/error.service';
import { ErrorModalComponent } from './components/modal/error-modal/error-modal.component';

import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [Header, Menu, RouterModule, ErrorModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  isMenu = signal<boolean>(true);
  errorService = inject(ErrorService);

  toggleMenu() {
    this.isMenu.update((prev) => !prev);
  }
}
