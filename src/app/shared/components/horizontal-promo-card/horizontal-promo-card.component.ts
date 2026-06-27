import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaLightboxComponent } from '../media-lightbox/media-lightbox.component';
import {
  type HorizontalPromoCardData,
  type ShowcaseMedia,
} from '../momo-card-types/momo-card-types.model';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-horizontal-promo-card',
  imports: [CommonModule],
  templateUrl: './horizontal-promo-card.component.html',
  styleUrl: './horizontal-promo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalPromoCardComponent {
  readonly card = input.required<HorizontalPromoCardData>();
  protected readonly activeIndex = signal(0);
  private readonly dialog = inject(DialogService);

  private dragStartX = 0;

  protected readonly activeSlide = computed(() => this.card().mediaGallery[this.activeIndex()] ?? null);

  protected setActiveIndex(index: number): void {
    this.activeIndex.set(index);
  }

  protected onPointerDown(event: PointerEvent): void {
    this.dragStartX = event.clientX;
  }

  protected onPointerUp(event: PointerEvent): void {
    const delta = event.clientX - this.dragStartX;

    if (Math.abs(delta) < 24) {
      return;
    }

    if (delta < 0) {
      this.activeIndex.update((current) =>
        Math.min(current + 1, this.card().mediaGallery.length - 1),
      );
      return;
    }

    this.activeIndex.update((current) => Math.max(current - 1, 0));
  }

  protected openMedia(media: ShowcaseMedia): void {
    if (media.type === 'video') {
      this.dialog.open(MediaLightboxComponent, media);
    }
  }
}
