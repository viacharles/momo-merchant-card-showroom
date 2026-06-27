import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CardVariant,
  type ProductCard,
  type ProductCardSettings,
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
  readonly variant = input<CardVariant>(CardVariant.Recommendation);
  readonly settings = input<ProductCardSettings>(DEFAULT_SETTINGS);

  protected readonly clusterClass = computed(() => {
    const variant = this.variant();

    return {
      'product-card-cluster--recommendation': variant === CardVariant.Recommendation,
      'product-card-cluster--search': variant === CardVariant.SearchResult,
      'product-card-cluster--flash': variant === CardVariant.FlashSale,
    };
  });
}
