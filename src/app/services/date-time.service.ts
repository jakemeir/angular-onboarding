import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, share, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  currentTime: Observable<Date>;

  constructor() {
    this.currentTime = interval(1000).pipe(
      startWith(0),
      map(() => new Date()),
      share()
    );
  }
}
