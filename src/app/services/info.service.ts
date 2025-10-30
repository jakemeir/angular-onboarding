import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';

export interface NetworkElement {
  id: string;
  type: string;
  ip_address: string;
  mac_address: string;
  hostname: string;
  manufacturer: string;
  model: string;
  status: string;
  location: string;
  last_seen: string;
}

@Injectable()
export class InfoService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);
  private networkElements = signal<NetworkElement[]>([]);

  public readonly networkElements$ = this.networkElements.asReadonly();

  private httpRequest<T>(method: string, url: string, errorMessage: string, body?: Partial<T>) {
    return this.httpClient
      .request<T>(method, url, {
        body,
      })
      .pipe(
        catchError((error) => {
          this.errorService.showError(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  public getNetworkElements() {
    return this.httpRequest<NetworkElement[]>(
      'GET',
      'http://localhost:3000/elements',
      'Failed to fetch network elements.'
    ).pipe(
      tap((elements) => {
        this.networkElements.set(elements);
      })
    );
  }

  public addNetworkElement(element: Partial<NetworkElement>) {
    return this.httpRequest<NetworkElement>(
      'POST',
      'http://localhost:3000/elements',
      'Failed to add network element.',
      element
    ).pipe(
      tap((newElement) => {
        this.networkElements.update((elements) => [...elements, newElement]);
      })
    );
  }

  public updateNetworkElement(id: string, element: Partial<NetworkElement>) {
    return this.httpRequest<NetworkElement>(
      'PUT',
      `http://localhost:3000/elements/${id}`,
      'Failed to update network element.',
      element
    ).pipe(
      tap((updatedElement) => {
        this.networkElements.update((elements) =>
          elements.map((el) => (el.id === id ? updatedElement : el))
        );
      })
    );
  }

  public deleteNetworkElement(id: string) {
    return this.httpRequest(
      'DELETE',
      `http://localhost:3000/elements/${id}`,
      'Failed to delete network element.'
    ).pipe(
      tap(() => {
        this.networkElements.update((elements) => elements.filter((el) => el.id !== id));
      })
    );
  }
}
