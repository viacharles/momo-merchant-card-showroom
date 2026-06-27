import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaLightboxComponent } from '../media-lightbox/media-lightbox.component';
import { DragCarouselDirective } from '../../directives/drag-carousel.directive';
import {
  type CompactVerticalCardData,
  type ShowcaseMedia,
} from '../momo-card-types/momo-card-types.model';
import { createCarouselState } from '../momo-card-types/carousel-state';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-compact-vertical-card',
  imports: [CommonModule, DragCarouselDirective],
  templateUrl: './compact-vertical-card.component.html',
  styleUrl: './compact-vertical-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactVerticalCardComponent {
  readonly card = input.required<CompactVerticalCardData>();
  private readonly dialog = inject(DialogService);
  private readonly carousel = createCarouselState(() => this.card().mediaGallery.length);

  protected readonly activeIndex = this.carousel.activeIndex;
  protected readonly dragOffsetPx = this.carousel.dragOffsetPx;
  protected readonly isDragging = this.carousel.isDragging;
  protected readonly nextSlide = this.carousel.next;
  protected readonly prevSlide = this.carousel.prev;
  protected readonly setActiveIndex = this.carousel.setActiveIndex;
  protected readonly setDragOffset = this.carousel.setDragOffset;
  protected readonly resetDragOffset = this.carousel.resetDragOffset;
  protected readonly trackTransform = computed(
    () => `translateX(calc(${-this.activeIndex() * 100}% + ${this.dragOffsetPx()}px))`,
  );

  protected openMedia(media: ShowcaseMedia): void {
    if (media.type === 'video') {
      this.dialog.open(MediaLightboxComponent, media);
    }
  }
}
