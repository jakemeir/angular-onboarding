import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(payload.exp * 1000);
    return expirationDate < new Date();
  } catch (e) {
    return true;
  }
}

export const authGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.token();

  if (token && !isTokenExpired(token)) {
    return true;
  } else {
    authService.signOut();
    return router.parseUrl('/auth');
  }
};
