import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardClusterComponent } from '../../shared/components/product-card-cluster/product-card-cluster.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { mapMomoGoodsToProductCard } from '../../shared/components/product-card/product-card.mapper';
import {
  CardVariant,
  type MomoApiResponse,
  type ProductCard,
  type ProductCardSettings,
} from '../../shared/components/product-card/product-card.model';
import { LocalStorageService } from '../../shared/services/local-storage.service';

interface ShowroomState {
  selectedCardId: string | null;
  selectedVariant: CardVariant;
  settings: ProductCardSettings;
}

const DEFAULT_SETTINGS: ProductCardSettings = {
  showSubtitle: true,
  showOriginalPrice: true,
  showStock: true,
  showTags: true,
  emphasizePrice: true,
};

const SHOWROOM_STORAGE_KEY = 'momo-card-showroom-state';

@Component({
  selector: 'app-card-showroom-page',
  imports: [CommonModule, ProductCardComponent, ProductCardClusterComponent],
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
  protected readonly settings = signal<ProductCardSettings>(DEFAULT_SETTINGS);

  protected readonly selectedCard = computed(() => {
    const cards = this.cards();
    const selectedId = this.selectedCardId();

    return cards.find((card) => card.id === selectedId) ?? cards[0] ?? null;
  });

  protected readonly companionCards = computed(() => {
    const cards = this.cards();
    const selectedId = this.selectedCardId();

    if (!cards.length) {
      return [];
    }

    const selectedIndex = cards.findIndex((card) => card.id === selectedId);
    const startIndex = selectedIndex >= 0 ? selectedIndex : 0;

    return Array.from({ length: Math.min(3, Math.max(cards.length - 1, 0)) }, (_, index) => {
      const nextIndex = (startIndex + index + 1) % cards.length;

      return cards[nextIndex];
    }).filter((card) => card.id !== cards[startIndex].id);
  });

  protected readonly sampleSnippet = computed(
    () => {
      const card = this.selectedCard();
      const serializedCard = this.escapeAttribute(JSON.stringify(card ?? this.getFallbackCard()));

      return `<momo-product-card
  data-variant="${this.escapeAttribute(this.selectedVariant())}"
  data-card="${serializedCard}"></momo-product-card>`;
    },
  );

  private readonly storage = inject(LocalStorageService);

  constructor() {
    const persistedState = this.storage.getItem<Partial<ShowroomState>>(SHOWROOM_STORAGE_KEY);

    if (persistedState?.selectedVariant) {
      this.selectedVariant.set(persistedState.selectedVariant);
    }

    if (persistedState?.selectedCardId) {
      this.selectedCardId.set(persistedState.selectedCardId);
    }

    if (persistedState?.settings) {
      this.settings.set({
        ...DEFAULT_SETTINGS,
        ...persistedState.settings,
      });
    }

    void this.loadCards();

    effect(() => {
      this.storage.setItem<ShowroomState>(SHOWROOM_STORAGE_KEY, {
        selectedCardId: this.selectedCard()?.id ?? null,
        selectedVariant: this.selectedVariant(),
        settings: this.settings(),
      });
    });
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

  private escapeAttribute(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('"', '&quot;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  }

  private getFallbackCard(): ProductCard {
    return {
      id: '13935648',
      imageUrl: '',
      title: '',
      subtitle: '',
      price: '',
      originalPrice: '',
      stock: '',
      tags: [],
    };
  }
}
