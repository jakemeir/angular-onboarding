import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from './api.service';

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
  private apiService = inject(ApiService);
  private networkElements = signal<NetworkElement[]>([]);
  public readonly networkElements$ = this.networkElements.asReadonly();

  public getNetworkElements() {
    return this.apiService
      .get<NetworkElement[]>(
        'http://localhost:3000/elements',
        'Failed to fetch network elements.'
      )
      .pipe(
        tap((elements) => {
          this.networkElements.set(elements);
        })
      );
  }

  public addNetworkElement(element: Partial<NetworkElement>) {
    return this.apiService
      .post<Partial<NetworkElement>, NetworkElement>(
        'http://localhost:3000/elements',
        'Failed to add network element.',
        element
      )
      .pipe(
        tap((newElement) => {
          this.networkElements.update((elements) => [...elements, newElement]);
        })
      );
  }

  public updateNetworkElement(id: string, element: Partial<NetworkElement>) {
    return this.apiService
      .put<Partial<NetworkElement>, NetworkElement>(
        `http://localhost:3000/elements/${id}`,
        'Failed to update network element.',
        element
      )
      .pipe(
        tap((updatedElement) => {
          this.networkElements.update((elements) =>
            elements.map((el) => (el.id === id ? updatedElement : el))
          );
        })
      );
  }

  public deleteNetworkElement(id: string) {
    return this.apiService
      .delete<void>(
        `http://localhost:3000/elements/${id}`,
        'Failed to delete network element.'
      )
      .pipe(
        tap(() => {
          this.networkElements.update((elements) => elements.filter((el) => el.id !== id));
        })
      );
  }
}
