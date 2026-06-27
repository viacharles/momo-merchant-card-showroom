export interface ShowcaseMedia {
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string;
}

export interface CompactVerticalCardData {
  id: string;
  title: string;
  promoText: string;
  price: string;
  originalPrice?: string;
  ratingCount: number;
  salesLabel: string;
  badges: string[];
  mediaGallery: ShowcaseMedia[];
}

export interface HorizontalPromoCardData {
  id: string;
  sectionTitle: string;
  accentLabel: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  mediaGallery: ShowcaseMedia[];
}

export interface FlashSaleCardData {
  id: string;
  title: string;
  promoHeadline: string;
  salePrice: string;
  originalPrice?: string;
  remainingSets: number;
  rewardText: string;
  ctaLabel: string;
  deadlineIso: string;
  media: ShowcaseMedia;
  badgeText?: string;
}
