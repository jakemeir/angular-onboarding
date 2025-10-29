import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoService, NetworkElement } from '../../services/info.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElementFormComponent } from '../element-form/element-form.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, ElementFormComponent],
  templateUrl: './info.html',
  styleUrl: './info.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InfoService],
})
export class Info implements OnInit {
  private infoService = inject(InfoService);
  private destroyRef = inject(DestroyRef);
  public networkElements = this.infoService.networkElements$;
  public isFormVisible = signal(false);
  public selectedElement = signal<NetworkElement | null>(null);

  ngOnInit() {
    this.infoService.getNetworkElements().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  showAddForm() {
    this.selectedElement.set(null);
    this.isFormVisible.set(true);
  }

  showUpdateForm(element: NetworkElement) {
    this.selectedElement.set(element);
    this.isFormVisible.set(true);
  }

  onCancel() {
    this.isFormVisible.set(false);
    this.selectedElement.set(null);
  }

  onSave(element: Partial<NetworkElement>) {
    const saveObservable = this.selectedElement()
      ? this.infoService.updateNetworkElement(this.selectedElement()!.id, element)
      : this.infoService.addNetworkElement(element);

    saveObservable
      .pipe(
        tap(() => this.onCancel()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
