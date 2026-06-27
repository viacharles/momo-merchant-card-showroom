import { describe, expect, it } from 'vitest';

import { mapMomoGoodsToProductCard } from './product-card.mapper';
import { type MomoGoodsInfo } from './product-card.model';

describe('mapMomoGoodsToProductCard', () => {
  it('maps momo goods info into product card view model', () => {
    const item: MomoGoodsInfo = {
      imgUrl: 'https://example.com/product.webp',
      imgUrlArray: [],
      imgTypeUrlArray: [],
      imgTagUrl: '',
      imgLongTagUrl: '',
      imgBottomTagUrl: '',
      goodsName: 'Demo Product',
      goodsSubName: 'Demo Subtitle',
      marketPrice: '$999',
      marketPriceModel: {
        basePrice: {
          goodsStatus: '',
          price: '999',
          sign: '$',
          strPrice: '',
        },
      },
      goodsPrice: '$799',
      goodsPriceModel: {
        basePrice: {
          goodsStatus: '',
          price: '799',
          sign: '$',
          strPrice: '',
        },
      },
      goodsStock: '5',
      goodsCode: 'demo-1',
      action: {
        actionType: 11,
        actionValue: 'demo-1',
        useDefault: false,
        extraValue: {
          urlParameter: '',
          cateType: '',
          isWebPage: '0',
          categoryCode: '',
          mdiv: '',
        },
      },
      goodsTag: [
        {
          imgUrl: 'https://example.com/tag.png',
          bgColor: '#FF960A',
          textColor: '#FFFFFF',
          content: '預',
        },
      ],
      isLimitBuyGoods: false,
      blockItem: {
        itemType: 'imgGoods',
        snapshotId: 'snapshot',
        itemAttrs: {
          itemId: 'item-1',
          goodsCode: 'demo-1',
          goodsName: 'Demo Product',
          url: '',
          methodName: '',
        },
        blockItemId: 'block-1',
        adAttrs: {
          adRequestId: '',
          adCampaignId: '',
          adCreativeId: '',
        },
      },
    };

    expect(mapMomoGoodsToProductCard(item)).toEqual({
      id: 'demo-1',
      imageUrl: 'https://example.com/product.webp',
      title: 'Demo Product',
      subtitle: 'Demo Subtitle',
      price: '$799',
      originalPrice: '$999',
      stock: '5',
      state: 'preorder',
      tags: [
        {
          label: '預',
          bgColor: '#FF960A',
          textColor: '#FFFFFF',
          iconUrl: 'https://example.com/tag.png',
        },
      ],
    });
  });
});
