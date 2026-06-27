import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { mapMomoGoodsToProductCard } from '../../shared/product-card/product-card.mapper';
import {
  CardVariant,
  type MomoApiResponse,
  type ProductCard,
} from '../../shared/product-card/product-card.model';

@Component({
  selector: 'app-card-showroom-page',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './card-showroom.page.html',
  styleUrl: './card-showroom.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardShowroomPageComponent {
  protected readonly cardVariants = Object.values(CardVariant);
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly cards = signal<ProductCard[]>([]);
  protected readonly selectedCardId = signal<string | null>(null);
  protected readonly selectedVariant = signal<CardVariant>(CardVariant.Recommendation);

  protected readonly selectedCard = computed(() => {
    const cards = this.cards();
    const selectedId = this.selectedCardId();

    return cards.find((card) => card.id === selectedId) ?? cards[0] ?? null;
  });

  protected readonly sampleSnippet = computed(
    () => `<momo-product-card
  data-id="${this.selectedCard()?.id ?? '13935648'}"
  data-variant="${this.selectedVariant()}"
  data-endpoint="/mock/momo-products.json"></momo-product-card>`,
  );

  constructor() {
    void this.loadCards();
  }

  protected trackByCardId(_: number, card: ProductCard): string {
    return card.id;
  }

  protected selectCard(cardId: string): void {
    this.selectedCardId.set(cardId);
  }

  protected updateVariant(variant: string): void {
    this.selectedVariant.set(variant as CardVariant);
  }

  private async loadCards(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const response = await fetch('/mock/momo-products.json');

      if (!response.ok) {
        throw new Error(`Unable to load mock data: ${response.status}`);
      }

      const payload = (await response.json()) as MomoApiResponse;
      const mappedCards = payload.rtnData.goodsInfoList.map(mapMomoGoodsToProductCard);

      this.cards.set(mappedCards);

      if (!this.selectedCardId() && mappedCards[0]) {
        this.selectedCardId.set(mappedCards[0].id);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.errorMessage.set(message);
    } finally {
      this.isLoading.set(false);
    }
  }
}
