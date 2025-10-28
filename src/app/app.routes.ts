import { Routes } from '@angular/router';
import { MainPage } from './main-page/main-page';
import { Info } from './info/info';
import { About } from './about/about';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'info',
    component: Info,
  },
  {
    path: 'about',
    component: About,
  },
];
