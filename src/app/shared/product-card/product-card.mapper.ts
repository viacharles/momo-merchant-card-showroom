import { type MomoGoodsInfo, type ProductCard } from './product-card.model';

export function mapMomoGoodsToProductCard(item: MomoGoodsInfo): ProductCard {
  return {
    id: item.goodsCode,
    imageUrl: item.imgUrl,
    title: item.goodsName,
    subtitle: item.goodsSubName,
    price: item.goodsPrice,
    originalPrice: item.marketPrice,
    stock: item.goodsStock,
    tags: item.goodsTag.map((tag) => ({
      label: tag.content,
      bgColor: tag.bgColor,
      textColor: tag.textColor,
      iconUrl: tag.imgUrl,
    })),
  };
}
