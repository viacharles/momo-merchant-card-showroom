import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CardVariant,
  type ProductCard,
  type ProductCardSettings,
} from './product-card.model';

const DEFAULT_SETTINGS: ProductCardSettings = {
  showSubtitle: true,
  showOriginalPrice: true,
  showStock: true,
  showTags: true,
  emphasizePrice: true,
};

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly card = input.required<ProductCard>();
  readonly variant = input<CardVariant>(CardVariant.Recommendation);
  readonly settings = input<ProductCardSettings>(DEFAULT_SETTINGS);

  protected readonly cardClass = computed(() => {
    const variant = this.variant();

    return {
      'product-card--recommendation': variant === CardVariant.Recommendation,
      'product-card--search': variant === CardVariant.SearchResult,
      'product-card--flash': variant === CardVariant.FlashSale,
      'product-card--price-emphasis': this.settings().emphasizePrice,
    };
  });

  protected readonly stockLabel = computed(() => {
    const stock = this.card().stock;

    if (!stock) {
      return null;
    }

    return `庫存 ${stock}`;
  });
}
