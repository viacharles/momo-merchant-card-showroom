export type ProductCardState =
  | 'default'
  | 'preorder'
  | 'limitedStock'
  | 'limitedBuy';

export interface MomoApiResponse {
  rtnData: MomoRtnData;
}

export interface MomoRtnData {
  mdiv: string;
  goodsInfoList: MomoGoodsInfo[];
}

export interface MomoGoodsInfo {
  imgUrl: string;
  imgUrlArray: string[];
  imgTypeUrlArray: string[];
  imgTagUrl: string;
  imgLongTagUrl: string;
  imgBottomTagUrl: string;
  goodsName: string;
  goodsSubName: string;
  marketPrice: string;
  marketPriceModel: MomoPriceModel;
  goodsPrice: string;
  goodsPriceModel: MomoPriceModel;
  goodsStock: string;
  goodsCode: string;
  action: MomoGoodsAction;
  goodsTag: MomoGoodsTag[];
  isLimitBuyGoods: boolean;
  blockItem: MomoBlockItem;
}

export interface MomoPriceModel {
  basePrice: {
    goodsStatus: string;
    price: string;
    sign: string;
    strPrice: string;
  };
}

export interface MomoGoodsAction {
  actionType: number;
  actionValue: string;
  useDefault: boolean;
  extraValue: {
    urlParameter: string;
    cateType: string;
    isWebPage: string;
    categoryCode: string;
    mdiv: string;
  };
}

export interface MomoGoodsTag {
  imgUrl: string;
  bgColor: string;
  textColor: string;
  content: string;
}

export interface MomoBlockItem {
  itemType: string;
  snapshotId: string;
  itemAttrs: {
    itemId: string;
    goodsCode: string;
    goodsName: string;
    url: string;
    methodName: string;
  };
  blockItemId: string;
  adAttrs: {
    adRequestId: string;
    adCampaignId: string;
    adCreativeId: string;
  };
}

export interface ProductCard {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  price: string;
  originalPrice?: string;
  stock?: string;
  tags: ProductTag[];
  state: ProductCardState;
}

export interface ProductTag {
  label: string;
  bgColor: string;
  textColor: string;
  iconUrl?: string;
}

export interface ProductCardSettings {
  showSubtitle: boolean;
  showOriginalPrice: boolean;
  showStock: boolean;
  showTags: boolean;
  emphasizePrice: boolean;
}
