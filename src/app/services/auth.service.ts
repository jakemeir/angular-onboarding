import { inject, Injectable, signal } from '@angular/core';
import { debounceTime, first, map, of, switchMap, tap, timer } from 'rxjs';
import { ApiService } from './api.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiService = inject(ApiService);
  public token = signal<string | null>(localStorage.getItem('token') || null);
  private router = inject(Router);

  public singUp(user: Partial<User>) {
    return this.apiService
      .post<Partial<User>, AuthResponse>('http://localhost:3000/signup', 'Failed to signup.', user)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          this.token.set(res.token);
        })
      );
  }

  public login(user: Partial<User>) {
    return this.apiService
      .post<Partial<User>, AuthResponse>('http://localhost:3000/login', 'Failed to login.', user)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          this.token.set(res.token);
        })
      );
  }

  public signOut() {
    localStorage.removeItem('token');
    this.token.set(null);
    this.router.navigate(['/auth']);
  }

  public usernameAvailableValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null);
      }

      return control.valueChanges.pipe(
        debounceTime(500),
        switchMap(() =>
          this.apiService.get<{ available: boolean }>(
            `http://localhost:3000/check-username?username=${encodeURIComponent(control.value)}`,
            'Failed to check username availability.'
          )
        ),
        map((res) => (res.available ? null : { duplicate: true })),
        first()
      );
    };
  }
}
