import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardVariant, type ProductCard } from './product-card.model';

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

  protected readonly cardClass = computed(() => {
    const variant = this.variant();

    return {
      'product-card--recommendation': variant === CardVariant.Recommendation,
      'product-card--search': variant === CardVariant.SearchResult,
      'product-card--flash': variant === CardVariant.FlashSale,
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
