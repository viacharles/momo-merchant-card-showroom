import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  type ProductCard,
  type ProductCardSettings,
  type ProductCardState,
} from '../product-card/product-card.model';

const DEFAULT_SETTINGS: ProductCardSettings = {
  showSubtitle: true,
  showOriginalPrice: true,
  showStock: true,
  showTags: true,
  emphasizePrice: true,
};

@Component({
  selector: 'app-product-card-cluster',
  imports: [CommonModule],
  templateUrl: './product-card-cluster.component.html',
  styleUrl: './product-card-cluster.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardClusterComponent {
  readonly mainCard = input.required<ProductCard>();
  readonly companionCards = input<ProductCard[]>([]);
  readonly state = input<ProductCardState>('default');
  readonly settings = input<ProductCardSettings>(DEFAULT_SETTINGS);

  protected readonly clusterClass = computed(() => {
    const state = this.state();

    return {
      'product-card-cluster--default': state === 'default',
      'product-card-cluster--preorder': state === 'preorder',
      'product-card-cluster--limited-stock': state === 'limitedStock',
      'product-card-cluster--limited-buy': state === 'limitedBuy',
    };
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
