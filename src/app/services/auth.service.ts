import { inject, Injectable, signal } from '@angular/core';
import { debounceTime, first, map, of, switchMap, tap, timer } from 'rxjs';
import { ApiService } from './api.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

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
  private token = signal<string | null>(localStorage.getItem('token') || null);

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
