import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';

@Component({
  selector: 'header[app-header]',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  toggle = output<void>();

  toggleMenu() {
    this.toggle.emit();
  }
}
