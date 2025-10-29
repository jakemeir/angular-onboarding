import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { Info } from './components/info/info';
import { About } from './components/about/about';

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
