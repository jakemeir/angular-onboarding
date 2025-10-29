import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { About } from './components/about/about';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'info',
    loadComponent: () => import('./components/info/info').then((m) => m.Info),
  },
  {
    path: 'about',
    component: About,
  },
];
