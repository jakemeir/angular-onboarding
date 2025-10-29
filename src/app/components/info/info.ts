import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoService } from '../../services/info.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.html',
  styleUrl: './info.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Info implements OnInit {
  private infoService = inject(InfoService);
  private destroyRef = inject(DestroyRef);
  public networkElements = this.infoService.networkElements$;

  ngOnInit() {
    this.infoService.getNetworkElements().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
