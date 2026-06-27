import type {
  CompactVerticalCardData,
  FlashSaleCardData,
  HorizontalPromoCardData,
  ShowcaseMedia,
} from '../../shared/components/momo-card-types/momo-card-types.model';

const demoVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

function createImageMedia(src: string, alt: string): ShowcaseMedia {
  return {
    type: 'image',
    src,
    alt,
  };
}

function createVideoMedia(src: string, poster: string, alt: string): ShowcaseMedia {
  return {
    type: 'video',
    src,
    poster,
    alt,
  };
}

function createFutureIso(hoursFromNow: number): string {
  const target = new Date();
  target.setHours(target.getHours() + hoursFromNow);
  return target.toISOString();
}

export const compactVerticalCards: CompactVerticalCardData[] = [
  {
    id: 'compact-1',
    title: '【麥當勞券】6/30限搶! 最後一檔豬肉滿福堡加蛋+經典美式',
    promoText: '限時優惠 即買即用',
    price: '$58',
    originalPrice: '$110',
    ratingCount: 4818,
    salesLabel: '總銷量>20萬',
    badges: ['速', '登記'],
    media: createImageMedia(
      'https://i3.momoshop.com.tw/1745310638/goodsimg/0013/935/648/13935648_OL_m.webp',
      '麥當勞優惠券商品示意',
    ),
  },
  {
    id: 'compact-2',
    title: '【幫寶適】2026全新一級幫 黏貼型S-XL/拉拉褲M-3XL',
    promoText: '滿1件折50',
    price: '$1,249',
    originalPrice: '$1,429',
    ratingCount: 1473,
    salesLabel: '總銷量>40萬',
    badges: ['折價券', '登記'],
    media: createVideoMedia(
      demoVideo,
      'https://i1.momoshop.com.tw/1778049775/goodsimg/0015/227/223/15227223_OL_m.webp',
      '幫寶適商品介紹影片',
    ),
  },
  {
    id: 'compact-3',
    title: '【ARIEL】極淨進化 4D抗菌 洗衣膠囊/洗衣球 60顆X2/3',
    promoText: '滿1件折180',
    price: '$899',
    originalPrice: '$1,079',
    ratingCount: 29292,
    salesLabel: '總銷量>30萬',
    badges: ['速', '登記'],
    media: createVideoMedia(
      demoVideo,
      'https://i2.momoshop.com.tw/1780648397/goodsimg/0015/344/248/15344248_OL_m.webp',
      'ARIEL 商品影片',
    ),
  },
  {
    id: 'compact-4',
    title: '【HERAN 禾聯】14吋智能變頻DC風扇 (HDF-14A3)',
    promoText: '滿1件折191',
    price: '$999',
    originalPrice: '$2,490',
    ratingCount: 20255,
    salesLabel: '總銷量>20萬',
    badges: ['登記'],
    media: createImageMedia(
      'https://i2.momoshop.com.tw/1751448278/goodsimg/0014/176/026/14176026_OL_m.webp',
      '禾聯風扇商品圖',
    ),
  },
  {
    id: 'compact-5',
    title: '【Hair Recipe】髮的食譜 豐鮮單瓶組 全新! 洗髮精/潤髮',
    promoText: '滿件享88折',
    price: '$289',
    originalPrice: '$489',
    ratingCount: 177,
    salesLabel: '總銷量>5萬',
    badges: ['速', '登記'],
    media: createImageMedia(
      'https://i4.momoshop.com.tw/1742276562/goodsimg/0013/810/242/13810242_OL_m.webp',
      'Hair Recipe 商品圖',
    ),
  },
];

export const horizontalPromoCards: HorizontalPromoCardData[] = [
  {
    id: 'promo-1',
    sectionTitle: 'mo店+ 超取$290免運無限次',
    accentLabel: '大容量收納',
    title: '【Mr.Box】70面寬/80面寬 收納推櫃系列',
    subtitle: '展開堆疊多用途，mo店+ 免運活動',
    price: '$1,180',
    originalPrice: '$2,500',
    badge: '店+',
    mediaGallery: [
      createVideoMedia(
        demoVideo,
        'https://i4.momoshop.com.tw/1778049775/goodsimg/0015/227/223/15227223_OL_m.webp',
        'Mr.Box 收納櫃介紹影片',
      ),
      createImageMedia(
        'https://i1.momoshop.com.tw/1778049775/goodsimg/0015/227/223/15227223_OL_m.webp',
        '收納櫃情境圖 1',
      ),
      createImageMedia(
        'https://i2.momoshop.com.tw/1780648397/goodsimg/0015/344/248/15344248_OL_m.webp',
        '收納櫃情境圖 2',
      ),
      createImageMedia(
        'https://i2.momoshop.com.tw/1751448278/goodsimg/0014/176/026/14176026_OL_m.webp',
        '收納櫃情境圖 3',
      ),
    ],
  },
  {
    id: 'promo-2',
    sectionTitle: '今日暢銷榜 即時更新',
    accentLabel: '韓系多巴胺配色',
    title: '【NEOFLAM】韓國製陶瓷塗層鍋具組',
    subtitle: '排行榜熱賣品，多圖拖曳切換展示',
    price: '$3,290',
    originalPrice: '$10,460',
    badge: 'TOP',
    mediaGallery: [
      createImageMedia(
        'https://i3.momoshop.com.tw/1745310638/goodsimg/0013/935/648/13935648_OL_m.webp',
        'NEOFLAM 商品圖 1',
      ),
      createVideoMedia(
        demoVideo,
        'https://i1.momoshop.com.tw/1778049775/goodsimg/0015/227/223/15227223_OL_m.webp',
        'NEOFLAM 商品影片',
      ),
      createImageMedia(
        'https://i4.momoshop.com.tw/1742276562/goodsimg/0013/810/242/13810242_OL_m.webp',
        'NEOFLAM 商品圖 2',
      ),
      createImageMedia(
        'https://i4.momoshop.com.tw/1747719845/goodsimg/0014/032/982/14032982_OL_m.webp',
        'NEOFLAM 商品圖 3',
      ),
    ],
  },
];

export const flashSaleCards: FlashSaleCardData[] = [
  {
    id: 'flash-1',
    title: '【夏普】6L高效除濕機',
    promoHeadline: '夏普超大牌 下單限量送200mo',
    salePrice: '$3,990',
    originalPrice: '$4,988',
    remainingSets: 59,
    rewardText: '下單限量送200mo',
    ctaLabel: '搶',
    deadlineIso: createFutureIso(3),
    media: createImageMedia(
      'https://i4.momoshop.com.tw/1742276562/goodsimg/0013/810/242/13810242_OL_m.webp',
      '夏普除濕機商品圖',
    ),
    badgeText: '預',
  },
  {
    id: 'flash-2',
    title: '【OASIS】冰塊冰溫熱淨飲水機',
    promoHeadline: '限時下殺 免萬加碼送3芯',
    salePrice: '$9,999',
    originalPrice: '$19,800',
    remainingSets: 29,
    rewardText: '滿額登記送1100mo點',
    ctaLabel: '搶',
    deadlineIso: createFutureIso(2),
    media: createVideoMedia(
      demoVideo,
      'https://i2.momoshop.com.tw/1780648397/goodsimg/0015/344/248/15344248_OL_m.webp',
      'OASIS 商品影片',
    ),
  },
  {
    id: 'flash-3',
    title: '【LUDEYA】超緊緻琥珀沙潤彈組',
    promoHeadline: '買1機送9豪禮 +300mo',
    salePrice: '$9,180',
    originalPrice: '$27,160',
    remainingSets: 99,
    rewardText: '新晶買1送9 再贈300mo',
    ctaLabel: '搶',
    deadlineIso: createFutureIso(1),
    media: createImageMedia(
      'https://i4.momoshop.com.tw/1747719845/goodsimg/0014/032/982/14032982_OL_m.webp',
      'LUDEYA 商品圖',
    ),
  },
  {
    id: 'flash-4',
    title: '【安耐曬】金鑽防曬露',
    promoHeadline: '一日限定 防曬霸主下殺',
    salePrice: '$888',
    originalPrice: '$1,900',
    remainingSets: 23,
    rewardText: '防曬霸主 下殺444/入',
    ctaLabel: '搶',
    deadlineIso: createFutureIso(5),
    media: createVideoMedia(
      demoVideo,
      'https://i2.momoshop.com.tw/1751448278/goodsimg/0014/176/026/14176026_OL_m.webp',
      '安耐曬商品影片',
    ),
  },
];
