import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  public get<T>(url: string, errorMessage: string) {
    return this.httpRequest<void, T>('GET', url, errorMessage);
  }

  public post<T, U>(url: string, errorMessage: string, body: T) {
    return this.httpRequest<T, U>('POST', url, errorMessage, body);
  }

  public put<T, U>(url: string, errorMessage: string, body: T) {
    return this.httpRequest<T, U>('PUT', url, errorMessage, body);
  }

  public delete<T>(url: string, errorMessage: string) {
    return this.httpRequest<void, T>('DELETE', url, errorMessage);
  }

  private httpRequest<T, U>(method: string, url: string, errorMessage: string, body?: T) {
    return this.httpClient
      .request<U>(method, url, {
        body,
      })
      .pipe(
        catchError((error) => {
          this.errorService.showError(error.error.message || errorMessage);
          return throwError(() => new Error(error.error.message || errorMessage));
        })
      );
  }
}
