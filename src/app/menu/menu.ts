import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DateTimeService } from '../services/date-time.service';

@Component({
  selector: 'nav[app-menu]',
  imports: [DatePipe, AsyncPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  dateTimeService = inject(DateTimeService);
}
