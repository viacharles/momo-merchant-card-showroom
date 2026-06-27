import {
  type MomoGoodsInfo,
  type ProductCard,
  type ProductCardState,
} from './product-card.model';

export function mapMomoGoodsToProductCard(item: MomoGoodsInfo): ProductCard {
  return {
    id: item.goodsCode,
    imageUrl: item.imgUrl,
    title: item.goodsName,
    subtitle: item.goodsSubName,
    price: item.goodsPrice,
    originalPrice: item.marketPrice,
    stock: item.goodsStock,
    state: deriveProductCardState(item),
    tags: item.goodsTag.map((tag) => ({
      label: tag.content,
      bgColor: tag.bgColor,
      textColor: tag.textColor,
      iconUrl: tag.imgUrl,
    })),
  };
}

function deriveProductCardState(item: MomoGoodsInfo): ProductCardState {
  if (item.isLimitBuyGoods) {
    return 'limitedBuy';
  }

  if (item.goodsTag.some((tag) => tag.content === '預')) {
    return 'preorder';
  }

  if (Number(item.goodsStock) <= 1) {
    return 'limitedStock';
  }

  return 'default';
}
