import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  type ProductCard,
  type ProductCardSettings,
  type ProductCardState,
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
  readonly state = input<ProductCardState>('default');
  readonly settings = input<ProductCardSettings>(DEFAULT_SETTINGS);

  protected readonly cardClass = computed(() => {
    const state = this.state();

    return {
      'product-card--default': state === 'default',
      'product-card--preorder': state === 'preorder',
      'product-card--limited-stock': state === 'limitedStock',
      'product-card--limited-buy': state === 'limitedBuy',
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

  protected readonly stateLabel = computed(() => {
    switch (this.state()) {
      case 'preorder':
        return 'Preorder';
      case 'limitedStock':
        return 'Limited Stock';
      case 'limitedBuy':
        return 'Limited Buy';
      default:
        return 'Default';
    }
  });
}
