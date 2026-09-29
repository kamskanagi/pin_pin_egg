import type { MenuCardItem } from '@/components/menu/MenuCard';
import type { Country } from '@/types/location';
import type { NewsCategory } from '@/types/news';
import type { OptionGroup } from '@/types/order';

// Option groups mirror the printed menu at the stores.
// Eggcakes take toppings; drinks come in a fixed cup size, hot or iced.
const toppingsGroup: OptionGroup = {
  key: 'toppings',
  labelZh: '加料',
  labelEn: 'Toppings',
  labelJa: 'トッピング',
  required: false,
  multiple: true,
  choices: [
    { key: 'strawberry', labelZh: '草莓', labelEn: 'Strawberry', labelJa: 'いちご', priceDeltaTwd: 15 },
    { key: 'condensed-milk', labelZh: '煉乳', labelEn: 'Condensed milk', labelJa: '練乳', priceDeltaTwd: 15 },
    { key: 'honey', labelZh: '蜂蜜', labelEn: 'Honey', labelJa: 'はちみつ', priceDeltaTwd: 15 },
    { key: 'cereal', labelZh: '脆脆', labelEn: 'Cereal', labelJa: 'シリアル', priceDeltaTwd: 15 },
    { key: 'sprinkles', labelZh: '彩糖', labelEn: 'Sprinkles', labelJa: 'カラースプレー', priceDeltaTwd: 15 },
    { key: 'chocolate', labelZh: '巧克力', labelEn: 'Chocolate', labelJa: 'チョコレート', priceDeltaTwd: 15 },
    { key: 'caramel', labelZh: '焦糖', labelEn: 'Caramel', labelJa: 'キャラメル', priceDeltaTwd: 15 },
    { key: 'marshmallow', labelZh: '棉花糖', labelEn: 'Marshmallow', labelJa: 'マシュマロ', priceDeltaTwd: 15 },
    { key: 'peanut-butter', labelZh: '花生', labelEn: 'Peanut butter', labelJa: 'ピーナッツバター', priceDeltaTwd: 25 },
    { key: 'oatmeal-rice', labelZh: '燕麥米香', labelEn: 'Oatmeal rice crisp', labelJa: 'オートミールおこし', priceDeltaTwd: 25 },
    { key: 'cheese', labelZh: '起司', labelEn: 'Cheese', labelJa: 'チーズ', priceDeltaTwd: 30 },
    { key: 'brown-sugar-mochi', labelZh: '黑糖麻糬', labelEn: 'Brown sugar mochi', labelJa: '黒糖もち', priceDeltaTwd: 30 },
  ],
};

/** Drinks are poured hot or iced; iced is served at the shop's fixed light-ice level. */
const temperatureGroup: OptionGroup = {
  key: 'temperature',
  labelZh: '溫度',
  labelEn: 'Temperature',
  labelJa: '温度',
  required: true,
  multiple: false,
  choices: [
    { key: 'hot', labelZh: '熱飲', labelEn: 'Hot', labelJa: 'ホット' },
    { key: 'iced', labelZh: '冰飲（微冰）', labelEn: 'Iced (light ice)', labelJa: 'アイス（氷少なめ）' },
  ],
};

/** Only the plain fresh-milk drink picks a syrup. */
const milkSyrupGroup: OptionGroup = {
  key: 'syrup',
  labelZh: '風味',
  labelEn: 'Flavor',
  labelJa: 'フレーバー',
  required: true,
  multiple: false,
  choices: [
    { key: 'brown-sugar', labelZh: '黑糖', labelEn: 'Brown sugar', labelJa: '黒糖' },
    { key: 'honey', labelZh: '蜂蜜', labelEn: 'Honey', labelJa: 'はちみつ' },
    { key: 'caramel', labelZh: '焦糖', labelEn: 'Caramel', labelJa: 'キャラメル' },
  ],
};

export interface PlaceholderStore {
  id: string;
  nameZh: string;
  nameEn: string;
  nameJa: string;
  addressZh: string;
  addressEn: string;
  addressJa: string;
  country: Country;
  cityZh: string;
  cityEn: string;
  cityJa: string;
  hoursZh: string;
  hoursEn: string;
  hoursJa: string;
  transitZh?: string;
  transitEn?: string;
  transitJa?: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  instagramHandle?: string;
}

export interface MenuHighlight {
  titleZh: string;
  titleEn: string;
  titleJa: string;
  descriptionZh: string;
  descriptionEn: string;
  descriptionJa: string;
  badge: 'signature' | 'seasonal' | 'new';
  priceTwd: number;
  image: string;
  href: string;
}

export const menuHighlights: MenuHighlight[] = [
  {
    titleZh: '品品雞蛋仔',
    titleEn: 'Eggcakes',
    titleJa: 'エッグケーキ',
    descriptionZh: '100% 純鮮奶與奶油製成，減糖配方、台灣在地麵粉，經典、濃郁、輕奢三大系列。',
    descriptionEn: 'Made with pure milk and Anchor butter on a reduced-sugar recipe. Classic, rich, and refined series.',
    descriptionJa: '純生乳とバターで焼き上げる、糖分控えめのエッグケーキ。定番・濃厚・上質の三シリーズ。',
    badge: 'signature',
    priceTwd: 98,
    image: '/images/menu/eggcake.jpg',
    href: '/menu/eggcakes',
  },
  {
    titleZh: '純喝好茶',
    titleEn: 'Pure Tea',
    titleJa: '純喫茶',
    descriptionZh: '台灣在地茶葉，獨立茶包現泡。從鹿野紅韻烏龍到極品玉山金萱。',
    descriptionEn: 'Local Taiwanese leaves brewed to order, from Luye ruby oolong to Yushan jinxuan.',
    descriptionJa: '台湾産の茶葉を一杯ずつ抽出。鹿野紅韻ウーロンから極品玉山金萱まで。',
    badge: 'signature',
    priceTwd: 80,
    image: '/images/menu/matcha.jpg',
    href: '/menu/drinks',
  },
  {
    titleZh: '頂級鮮奶',
    titleEn: 'Fresh Milk Series',
    titleJa: 'プレミアムミルク',
    descriptionZh: '港式茶走、蜂蜜紅烏龍拿鐵、厚抹茶拿鐵，鮮奶與茶的濃厚相遇。',
    descriptionEn: 'Hong Kong-style milk tea, honey oolong latte, and thick matcha latte.',
    descriptionJa: '香港式ミルクティー、蜂蜜紅ウーロンラテ、厚抹茶ラテ。',
    badge: 'new',
    priceTwd: 80,
    image: '/images/menu/coffee.jpg',
    href: '/menu/drinks',
  },
];

export const eggcakeItems: MenuCardItem[] = [
  {
    id: 'eggcake-original',
    nameZh: '原味雞蛋',
    nameEn: 'Original',
    nameJa: 'オリジナル',
    descriptionZh: '100% 純鮮奶與奶油烘成，外酥內軟的經典原味。',
    descriptionEn: 'Pure milk and Anchor butter, baked crisp outside and soft inside.',
    descriptionJa: '純生乳とバターだけで焼き上げた、外はカリッと中はふんわりの定番。',
    priceTwd: 98,
    badges: [],
    series: 'classic',
    image: '/images/menu/eggcake.jpg',
    optionGroups: [toppingsGroup],
  },
  {
    id: 'eggcake-chocolate',
    nameZh: '朱古力',
    nameEn: 'Chocolate',
    nameJa: 'チョコレート',
    descriptionZh: '濃郁可可香氣，甜而不膩的人氣口味。',
    descriptionEn: 'Deep cocoa aroma, rich without being too sweet.',
    descriptionJa: '濃厚なカカオの香り。甘すぎない人気の味。',
    priceTwd: 108,
    badges: ['signature'],
    series: 'classic',
    image: '/images/menu/eggcake.jpg',
    optionGroups: [toppingsGroup],
  },
  {
    id: 'eggcake-oreo',
    nameZh: 'OREO',
    nameEn: 'OREO',
    nameJa: 'OREO',
    descriptionZh: '餅乾碎粒滿滿，咬下去還有脆脆口感。',
    descriptionEn: 'Packed with cookie pieces for a crunch in every bite.',
    descriptionJa: 'クッキーをたっぷり。ザクッとした食感が楽しい一本。',
    priceTwd: 108,
    badges: ['signature'],
    series: 'classic',
    image: '/images/menu/eggcake.jpg',
    optionGroups: [toppingsGroup],
  },
  {
    id: 'eggcake-brown-sugar-mochi',
    nameZh: '黑糖QQ麻糬',
    nameEn: 'Brown Sugar Mochi',
    nameJa: '黒糖もち',
    descriptionZh: '寶山黑糖搭配 QQ 麻糬，拉絲又有嚼勁。',
    descriptionEn: 'Baoshan brown sugar with chewy mochi that pulls as you bite.',
    descriptionJa: '宝山黒糖ともちもちの求肥。伸びる食感が楽しい。',
    priceTwd: 118,
    badges: ['limited'],
    series: 'rich',
    image: '/images/menu/seasonal.jpg',
    optionGroups: [toppingsGroup],
  },
  {
    id: 'eggcake-cheese',
    nameZh: '乳酪起司',
    nameEn: 'Cheese',
    nameJa: 'チーズ',
    descriptionZh: '鹹甜交織的乳酪香，出爐時最是濃郁。',
    descriptionEn: 'Sweet-salty cheese, at its richest straight from the mold.',
    descriptionJa: '甘じょっぱいチーズの香り。焼きたてが一番濃厚。',
    priceTwd: 118,
    badges: ['signature'],
    series: 'rich',
    image: '/images/menu/eggcake.jpg',
    optionGroups: [toppingsGroup],
  },
  {
    id: 'eggcake-matcha',
    nameZh: '高山抹茶',
    nameEn: 'Matcha',
    nameJa: '高山抹茶',
    descriptionZh: '抹茶的回甘與微苦，大人風味的一款。',
    descriptionEn: 'Matcha with a gentle bitterness and a sweet finish.',
    descriptionJa: 'ほろ苦さと後からくる甘み。大人の味わい。',
    priceTwd: 118,
    badges: [],
    series: 'luxe',
    image: '/images/menu/matcha.jpg',
    optionGroups: [toppingsGroup],
  },
  {
    id: 'eggcake-sesame',
    nameZh: '芝麻開門',
    nameEn: 'Sesame',
    nameJa: 'ごま',
    descriptionZh: '黑芝麻焙香濃郁，越嚼越香的懷舊風味。',
    descriptionEn: 'Toasted black sesame that deepens as you chew.',
    descriptionJa: '香ばしい黒ごま。噛むほどに広がる懐かしい風味。',
    priceTwd: 108,
    badges: ['signature'],
    series: 'luxe',
    image: '/images/menu/eggcake.jpg',
    optionGroups: [toppingsGroup],
  },
];

/** 純喝好茶系列 — brewed by the cup, 20 oz. */
export const teaItems: MenuCardItem[] = [
  {
    id: 'tea-luye-ruby-oolong',
    nameZh: '鹿野紅韻烏龍',
    nameEn: 'Luye Ruby Oolong Tea',
    nameJa: '鹿野紅韻ウーロン茶',
    descriptionZh: '台東鹿野茶區，蜜香紅韻、尾韻清甜。20 oz。',
    descriptionEn: 'From the Luye highlands of Taitung — honeyed, with a clean sweet finish. 20 oz.',
    descriptionJa: '台東・鹿野産。蜜のような香りとすっきりした甘い余韻。20 oz。',
    priceTwd: 80,
    badges: ['signature'],
    image: '/images/menu/matcha.jpg',
    optionGroups: [temperatureGroup],
  },
  {
    id: 'tea-roasted-guanyin',
    nameZh: '碳焙觀音烏龍',
    nameEn: 'Roasted Guanyin Oolong Tea',
    nameJa: '炭焙観音ウーロン茶',
    descriptionZh: '炭火焙香，厚實而沉穩的烏龍。20 oz。',
    descriptionEn: 'Charcoal-roasted oolong, deep and steady. 20 oz.',
    descriptionJa: '炭火で焙煎した、厚みのある落ち着いたウーロン。20 oz。',
    priceTwd: 80,
    badges: [],
    image: '/images/menu/matcha.jpg',
    optionGroups: [temperatureGroup],
  },
  {
    id: 'tea-aged-black',
    nameZh: '熟成紅茶',
    nameEn: 'Aged Black Tea',
    nameJa: '熟成紅茶',
    descriptionZh: '熟成工序帶出圓潤果香，冷熱皆宜。20 oz。',
    descriptionEn: 'Aged for a round, fruity body. Good hot or iced. 20 oz.',
    descriptionJa: '熟成によるまろやかな果実香。ホットでもアイスでも。20 oz。',
    priceTwd: 80,
    badges: [],
    image: '/images/menu/coffee.jpg',
    optionGroups: [temperatureGroup],
  },
  {
    id: 'tea-jinxuan',
    nameZh: '極品玉山金萱',
    nameEn: 'Taiwan Jinxuan Oolong Tea',
    nameJa: '極品玉山金萱',
    descriptionZh: '玉山高海拔金萱，天然奶香清雅。20 oz。',
    descriptionEn: 'High-elevation Yushan jinxuan with a natural milky note. 20 oz.',
    descriptionJa: '玉山高地の金萱。自然なミルクのような香り。20 oz。',
    priceTwd: 130,
    badges: ['signature'],
    image: '/images/menu/matcha.jpg',
    optionGroups: [temperatureGroup],
  },
  {
    id: 'tea-pouchong',
    nameZh: '原鄉包種青茶',
    nameEn: 'Heritage Pouchong Oolong Tea',
    nameJa: '原郷包種青茶',
    descriptionZh: '包種青茶的花香與輕盈口感，入喉清爽。20 oz。',
    descriptionEn: 'Floral, light-bodied pouchong that finishes clean. 20 oz.',
    descriptionJa: '花のような香りと軽やかな口当たりの包種茶。20 oz。',
    priceTwd: 130,
    badges: ['signature'],
    image: '/images/menu/matcha.jpg',
    optionGroups: [temperatureGroup],
  },
];

/** 無咖啡因系列 — caffeine-free. */
export const caffeineFreeItems: MenuCardItem[] = [
  {
    id: 'drink-honey-citron',
    nameZh: '黃金柚香蜜茶',
    nameEn: 'Honey Citron Tea',
    nameJa: '黄金柚子蜜茶',
    descriptionZh: '柚子果粒與蜂蜜，酸甜舒爽。16 oz。',
    descriptionEn: 'Yuzu peel and honey — bright, sweet, and easy. 16 oz.',
    descriptionJa: '柚子の果皮とはちみつ。爽やかな甘酸っぱさ。16 oz。',
    priceTwd: 80,
    badges: [],
    image: '/images/menu/strawberry.jpg',
    optionGroups: [temperatureGroup],
  },
  {
    id: 'drink-fruit-tea',
    nameZh: '純真水果茶',
    nameEn: 'Fruit Tea',
    nameJa: 'フルーツティー',
    descriptionZh: '新鮮水果現切熬煮，無咖啡因。20 oz。',
    descriptionEn: 'Simmered with freshly cut fruit, caffeine-free. 20 oz.',
    descriptionJa: 'カットしたフルーツを煮出したカフェインレス。20 oz。',
    priceTwd: 80,
    badges: ['signature'],
    image: '/images/menu/strawberry.jpg',
    optionGroups: [temperatureGroup],
  },
];

/** 頂級鮮奶系列 — tea and cocoa with fresh milk, 16 oz. */
export const milkItems: MenuCardItem[] = [
  {
    id: 'milk-hk-style',
    nameZh: '純厚港式茶走',
    nameEn: 'HK Style Milk Tea',
    nameJa: '香港式ミルクティー',
    descriptionZh: '港式茶走做法，濃茶配鮮奶，厚實滑順。16 oz。',
    descriptionEn: 'Strong tea cut with fresh milk, Hong Kong "cha chow" style. 16 oz.',
    descriptionJa: '濃いお茶に生乳を合わせた香港式。厚みのある口当たり。16 oz。',
    priceTwd: 80,
    badges: ['signature'],
    image: '/images/menu/coffee.jpg',
    optionGroups: [temperatureGroup],
  },
  {
    id: 'milk-oolong-honey',
    nameZh: '蜂蜜紅烏龍拿鐵',
    nameEn: 'Oolong Milk Tea with Honey',
    nameJa: '蜂蜜紅ウーロンラテ',
    descriptionZh: '紅烏龍茶香配蜂蜜與鮮奶，甜潤耐喝。16 oz。',
    descriptionEn: 'Ruby oolong with honey and fresh milk. 16 oz.',
    descriptionJa: '紅ウーロンにはちみつと生乳を合わせた一杯。16 oz。',
    priceTwd: 80,
    badges: ['signature'],
    image: '/images/menu/coffee.jpg',
    optionGroups: [temperatureGroup],
  },
  {
    id: 'milk-fresh',
    nameZh: '香濃鮮奶',
    nameEn: 'Fresh Milk',
    nameJa: '濃厚ミルク',
    descriptionZh: '純鮮奶搭配黑糖、蜂蜜或焦糖，任選一種風味。16 oz。',
    descriptionEn: 'Fresh milk with your choice of brown sugar, honey, or caramel. 16 oz.',
    descriptionJa: '生乳に黒糖・はちみつ・キャラメルからお好みの一種を。16 oz。',
    priceTwd: 80,
    badges: [],
    image: '/images/menu/coffee.jpg',
    optionGroups: [milkSyrupGroup, temperatureGroup],
  },
  {
    id: 'milk-chocolate',
    nameZh: '濃可可拿鐵',
    nameEn: 'Chocolate Latte',
    nameJa: '濃厚ココアラテ',
    descriptionZh: '可可濃厚，鮮奶柔順，冬天的必點。16 oz。',
    descriptionEn: 'Deep cocoa smoothed with fresh milk. 16 oz.',
    descriptionJa: '濃厚なカカオを生乳でまろやかに。16 oz。',
    priceTwd: 90,
    badges: [],
    image: '/images/menu/coffee.jpg',
    optionGroups: [temperatureGroup],
  },
  {
    id: 'milk-matcha',
    nameZh: '厚抹茶拿鐵',
    nameEn: 'Matcha Latte',
    nameJa: '厚抹茶ラテ',
    descriptionZh: '抹茶用量加倍，茶感明顯不被奶味蓋過。16 oz。',
    descriptionEn: 'Double matcha, so the tea still speaks through the milk. 16 oz.',
    descriptionJa: '抹茶を倍量に。ミルクに負けないお茶の存在感。16 oz。',
    priceTwd: 90,
    badges: [],
    image: '/images/menu/matcha.jpg',
    optionGroups: [temperatureGroup],
  },
  {
    id: 'milk-brown-sugar-black-tea',
    nameZh: '黑糖紅茶拿鐵',
    nameEn: 'Brown Sugar Milk Tea',
    nameJa: '黒糖紅茶ラテ',
    descriptionZh: '寶山黑糖熬煮，紅茶與鮮奶的濃厚組合。16 oz。',
    descriptionEn: 'Baoshan brown sugar simmered into black tea and fresh milk. 16 oz.',
    descriptionJa: '宝山黒糖を煮詰め、紅茶と生乳に合わせた濃厚ラテ。16 oz。',
    priceTwd: 90,
    badges: [],
    image: '/images/menu/coffee.jpg',
    optionGroups: [temperatureGroup],
  },
];

/** Limited-run items flagged on the printed menu (期間優惠). */
export const seasonalItems: MenuCardItem[] = eggcakeItems.filter((item) => item.badges.includes('limited'));

export const orderableItems: MenuCardItem[] = Array.from(
  new Map(
    [...eggcakeItems, ...teaItems, ...caffeineFreeItems, ...milkItems].map((item) => [item.id, item])
  ).values()
);

export const storeLocations: PlaceholderStore[] = [
  {
    id: 'mitsui-outlet',
    nameZh: '台中港三井 Outlet',
    nameEn: 'Mitsui Outlet Park',
    nameJa: '三井アウトレットパーク台中港',
    addressZh: '台中市梧棲區台灣大道十段168號',
    addressEn: '168, Section 10, Taiwan Blvd, Wuqi District, Taichung',
    addressJa: '台中市梧棲区台湾大道十段168号',
    country: 'taiwan',
    cityZh: '台中',
    cityEn: 'Taichung',
    cityJa: '台中',
    hoursZh: '11:00–21:30',
    hoursEn: '11:00–21:30',
    hoursJa: '11:00–21:30',
    transitZh: '台中港站',
    transitEn: 'Taichung Port Station',
    transitJa: '台中港駅',
    lat: 24.2564,
    lng: 120.5202,
    googleMapsUrl: 'https://maps.google.com/?q=Mitsui+Outlet+Park+Taichung',
  },
  {
    id: 'taichung-lalaport',
    nameZh: '台中 LaLaport 南館1F',
    nameEn: 'Taichung LaLaport',
    nameJa: '台中ららぽーと南館1F',
    addressZh: '台中市東區進德路600號南館1F',
    addressEn: '600, Jinde Rd, East District, Taichung – South Bldg 1F',
    addressJa: '台中市東区進徳路600号南館1F',
    country: 'taiwan',
    cityZh: '台中',
    cityEn: 'Taichung',
    cityJa: '台中',
    hoursZh: '11:00–22:00',
    hoursEn: '11:00–22:00',
    hoursJa: '11:00–22:00',
    transitZh: '大慶站',
    transitEn: 'Daqing Station',
    transitJa: '大慶駅',
    lat: 24.1296,
    lng: 120.6874,
    googleMapsUrl: 'https://maps.google.com/?q=LaLaport+Taichung',
  },
  {
    id: 'nangang-lalaport',
    nameZh: '南港 LaLaport B1 美食街',
    nameEn: 'Nangang LaLaport',
    nameJa: '南港ららぽーとB1フードコート',
    addressZh: '台北市南港區經貿二路188號B1',
    addressEn: '188, Jingmao 2nd Rd, Nangang, Taipei – B1 Food Court',
    addressJa: '台北市南港区経貿二路188号B1',
    country: 'taiwan',
    cityZh: '台北',
    cityEn: 'Taipei',
    cityJa: '台北',
    hoursZh: '11:00–21:30',
    hoursEn: '11:00–21:30',
    hoursJa: '11:00–21:30',
    transitZh: '南港站',
    transitEn: 'Nangang Station',
    transitJa: '南港駅',
    lat: 25.0554,
    lng: 121.6169,
    googleMapsUrl: 'https://maps.google.com/?q=LaLaport+Nangang',
  },
  {
    id: 'tokyo-nakameguro',
    nameZh: '東京中目黒店',
    nameEn: 'Tokyo Nakameguro',
    nameJa: '東京中目黒店',
    addressZh: '東京都目黒區中目黒',
    addressEn: 'Nakameguro, Meguro City, Tokyo',
    addressJa: '東京都目黒区中目黒',
    country: 'japan',
    cityZh: '東京',
    cityEn: 'Tokyo',
    cityJa: '東京',
    hoursZh: '11:00–20:00',
    hoursEn: '11:00–20:00',
    hoursJa: '11:00–20:00',
    transitZh: '中目黒駅',
    transitEn: 'Nakameguro Station',
    transitJa: '中目黒駅',
    lat: 35.6440,
    lng: 139.6989,
    googleMapsUrl: 'https://maps.google.com/?q=Nakameguro+Tokyo',
    instagramHandle: '@pinpinnakameguro',
  },
];

export interface PlaceholderNewsPost {
  slug: string;
  titleZh: string;
  titleEn: string;
  titleJa: string;
  excerptZh: string;
  excerptEn: string;
  excerptJa: string;
  bodyEn: string;
  bodyZh: string;
  category: NewsCategory;
  publishedAt: string;
}

export const newsPosts: PlaceholderNewsPost[] = [
  {
    slug: 'nakameguro-grand-opening',
    titleZh: '東京中目黒店盛大開幕',
    titleEn: 'Tokyo Nakameguro Grand Opening',
    titleJa: '東京中目黒店グランドオープン',
    excerptZh: '品品 Café 正式登陸日本！中目黒店將帶來最道地的台灣雞蛋仔體驗。',
    excerptEn: 'Pin Pin Café officially lands in Japan! Our Nakameguro store brings the most authentic Taiwanese eggcake experience to Tokyo.',
    excerptJa: '品品カフェが日本に上陸！中目黒店で本場台湾のエッグケーキ体験をお届けします。',
    bodyEn: 'We are thrilled to announce the grand opening of our first Japan location in the heart of Nakameguro, Tokyo. This marks a milestone in Pin Pin Café\'s international expansion, bringing our signature crispy-outside, QQ-soft-inside eggcakes to Japanese food lovers.\n\nThe Nakameguro store features a cozy, modern interior that blends Taiwanese warmth with Japanese minimalism. Our full menu of eggcakes, premium teas, and specialty coffee is available, along with Japan-exclusive seasonal flavors.\n\nFollow @pinpinnakameguro on Instagram for updates and special opening promotions.',
    bodyZh: '我們很高興宣布品品 Café 在東京中目黒的第一家日本門市盛大開幕。這標誌著品品 Café 國際擴展的重要里程碑，將我們招牌外酥內軟QQ的雞蛋仔帶給日本美食愛好者。\n\n中目黒店採用溫馨現代的室內設計，融合台灣溫暖與日本極簡風格。提供完整的雞蛋仔、精品茶飲和特調咖啡菜單，以及日本限定的季節口味。\n\n請追蹤 @pinpinnakameguro 的 Instagram 獲取最新消息和開幕優惠。',
    category: 'store-opening',
    publishedAt: '2026-03-15',
  },
  {
    slug: 'spring-strawberry-collection',
    titleZh: '春季草莓系列登場',
    titleEn: 'Spring Strawberry Collection Is Here',
    titleJa: '春のいちごコレクション登場',
    excerptZh: '春天來了！草莓雞蛋仔和櫻花拿鐵，限定供應中。',
    excerptEn: 'Spring has arrived! Strawberry eggcake and sakura latte, available for a limited time.',
    excerptJa: '春が来ました！いちごエッグケーキと桜ラテ、期間限定で登場。',
    bodyEn: 'As cherry blossoms begin to bloom, we\'re excited to launch our Spring Strawberry Collection. This season\'s lineup features two limited-edition items:\n\n**Strawberry Eggcake** — Fresh strawberry jam and cream filling, nestled in our signature crispy-QQ eggcake batter. A burst of spring in every bite.\n\n**Sakura Latte** — Delicate sakura syrup blended with steamed fresh milk, topped with a whisper of cherry blossom petals.\n\nAvailable at all Taiwan and Japan locations while supplies last. Don\'t miss these seasonal favorites!',
    bodyZh: '隨著櫻花開始綻放，我們很高興推出春季草莓系列。本季陣容包含兩款限定商品：\n\n**草莓雞蛋仔** — 新鮮草莓果醬與奶油內餡，搭配我們招牌外酥內軟QQ的雞蛋仔麵糊。每一口都是春天的味道。\n\n**櫻花拿鐵** — 細緻的櫻花糖漿與蒸汽鮮奶調和，點綴一抹櫻花花瓣。\n\n全台灣及日本門市供應，售完為止。別錯過這些季節限定美味！',
    category: 'new-flavor',
    publishedAt: '2026-03-01',
  },
  {
    slug: 'nangang-lalaport-opening',
    titleZh: '南港 LaLaport 店開幕',
    titleEn: 'Now Open: Nangang LaLaport',
    titleJa: '南港ららぽーと店オープン',
    excerptZh: '品品 Café 進駐台北！南港 LaLaport B1 美食街，歡迎來品嚐。',
    excerptEn: 'Pin Pin Café arrives in Taipei! Find us at Nangang LaLaport B1 Food Court.',
    excerptJa: '品品カフェが台北に進出！南港ららぽーとB1フードコートでお待ちしています。',
    bodyEn: 'We\'re excited to announce our newest location at Nangang LaLaport in Taipei. Located in the B1 Food Court, this store brings our beloved eggcakes and drinks to the Taipei metropolitan area for the first time.\n\nConveniently accessible from Nangang Station, this location is perfect for a quick eggcake break during your shopping trip.',
    bodyZh: '我們很高興宣布品品 Café 最新門市在台北南港 LaLaport 開幕。位於B1美食街，這家店首次將我們心愛的雞蛋仔和飲品帶到台北都會區。\n\n鄰近南港站，交通便利，非常適合在購物途中來一份雞蛋仔。',
    category: 'store-opening',
    publishedAt: '2026-02-10',
  },
  {
    slug: 'year-of-the-snake-limited',
    titleZh: '蛇年限定雞蛋仔',
    titleEn: 'Year of the Snake Limited Edition',
    titleJa: '巳年限定エッグケーキ',
    excerptZh: '農曆新年限定！金箔蜂蜜雞蛋仔，品味蛇年好運。',
    excerptEn: 'Lunar New Year special! Gold leaf honey eggcake — taste the fortune of the Year of the Snake.',
    excerptJa: '旧正月限定！金箔はちみつエッグケーキで巳年の幸運を味わおう。',
    bodyEn: 'To celebrate the Lunar New Year and the Year of the Snake, we\'ve created a special limited-edition Gold Leaf Honey Eggcake. Drizzled with premium longan honey and finished with edible gold leaf, this festive treat captures the spirit of prosperity and renewal.',
    bodyZh: '為慶祝農曆新年蛇年，我們特別推出限定版金箔蜂蜜雞蛋仔。淋上頂級龍眼蜜，點綴食用金箔，這款節慶點心象徵繁榮與新生。',
    category: 'event',
    publishedAt: '2026-01-25',
  },
];
