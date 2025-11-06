import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DateTimeService } from '../../services/date-time.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav[app-menu]',
  standalone: true,
  imports: [DatePipe, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  dateTimeService = inject(DateTimeService);
}
