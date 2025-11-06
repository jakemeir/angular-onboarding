import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { About } from './components/about/about';
import { AuthComponent } from './components/auth/auth';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'info',
    loadComponent: () => import('./components/info/info').then((m) => m.Info),
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
