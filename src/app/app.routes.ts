import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { About } from './components/about/about';
import { AuthComponent } from './components/auth/auth';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'info',
    loadComponent: () => import('./components/info/info').then((m) => m.Info),
    canMatch: [authGuard],
  },
  {
    path: 'about',
    component: About,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
