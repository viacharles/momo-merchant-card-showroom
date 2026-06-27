import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompactVerticalCardComponent } from '../../shared/components/compact-vertical-card/compact-vertical-card.component';
import { FlashSaleCardComponent } from '../../shared/components/flash-sale-card/flash-sale-card.component';
import { HorizontalPromoCardComponent } from '../../shared/components/horizontal-promo-card/horizontal-promo-card.component';
import {
  compactVerticalCards,
  flashSaleCards,
  horizontalPromoCards,
} from './card-showroom.data';

@Component({
  selector: 'app-card-showroom-page',
  imports: [
    CommonModule,
    CompactVerticalCardComponent,
    HorizontalPromoCardComponent,
    FlashSaleCardComponent,
  ],
  templateUrl: './card-showroom.page.html',
  styleUrl: './card-showroom.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardShowroomPageComponent {
  protected readonly compactVerticalCards = compactVerticalCards;
  protected readonly horizontalPromoCards = horizontalPromoCards;
  protected readonly flashSaleCards = flashSaleCards;
}
