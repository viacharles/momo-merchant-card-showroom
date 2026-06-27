import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaLightboxComponent } from '../media-lightbox/media-lightbox.component';
import {
  type FlashSaleCardData,
  type ShowcaseMedia,
} from '../momo-card-types/momo-card-types.model';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-flash-sale-card',
  imports: [CommonModule],
  templateUrl: './flash-sale-card.component.html',
  styleUrl: './flash-sale-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlashSaleCardComponent {
  readonly card = input.required<FlashSaleCardData>();
  protected readonly now = signal(Date.now());
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(DialogService);

  protected readonly countdown = computed(() => {
    const diff = new Date(this.card().deadlineIso).getTime() - this.now();
    const safeDiff = Math.max(diff, 0);
    const hours = Math.floor(safeDiff / 3_600_000);
    const minutes = Math.floor((safeDiff % 3_600_000) / 60_000);
    const seconds = Math.floor((safeDiff % 60_000) / 1_000);

    return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0'));
  });

  constructor() {
    const timer = window.setInterval(() => this.now.set(Date.now()), 1000);
    this.destroyRef.onDestroy(() => window.clearInterval(timer));
  }

  protected openMedia(media: ShowcaseMedia): void {
    if (media.type === 'video') {
      this.dialog.open(MediaLightboxComponent, media);
    }
  }
}
