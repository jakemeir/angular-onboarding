import { Component } from '@angular/core';
import { ElementCallbackDirective } from '../directives/element-callback.directive';

@Component({
  selector: 'main[app-main-page]',
  imports: [ElementCallbackDirective],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  growCallback = (el: HTMLElement) => {
    el.style.fontSize = '36px';
    el.style.transition = 'font-size 0.5s ease-in-out';
  };

  redCallback = (el: HTMLElement) => {
    el.style.color = 'red';
    el.style.transition = 'color 0.5s ease-in-out';
  };

  shrinkCallback = (el: HTMLElement) => {
    el.style.fontSize = '24px';
    el.style.transition = 'font-size 0.5s ease-in-out';
  };

  yellowCallback = (el: HTMLElement) => {
    el.style.color = 'green';
    el.style.transition = 'color 0.5s ease-in-out';
  };

  h2Callbacks = [this.growCallback, this.redCallback, this.shrinkCallback, this.yellowCallback];
}
