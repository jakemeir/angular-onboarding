import { Component } from '@angular/core';
import { ElementCallbackDirective } from '../../directives/element-callback.directive';
import { StyleAnimatorPipe } from '../../pipes/style-animator.pipe';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ElementCallbackDirective, StyleAnimatorPipe],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
