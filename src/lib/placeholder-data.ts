import type { MenuCardItem } from '@/components/menu/MenuCard';
import type { Country } from '@/types/location';
import type { NewsCategory } from '@/types/news';

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
  priceJpy: number;
  image: string;
  href: string;
}

export const menuHighlights: MenuHighlight[] = [
  {
    titleZh: '雞蛋仔系列',
    titleEn: 'Eggcakes',
    titleJa: 'エッグケーキ',
    descriptionZh: '外酥內軟QQ，招牌港式雞蛋仔，經典與季節限定口味。',
    descriptionEn: 'Crispy outside, QQ soft inside. Our signature Hong Kong-style egg waffles in classic and seasonal flavors.',
    descriptionJa: '外はカリッと、中はもちもち。定番から季節限定まで。',
    badge: 'signature',
    priceTwd: 60,
    priceJpy: 300,
    image: '/images/menu/eggcake.jpg',
    href: '/menu/eggcakes',
  },
  {
    titleZh: '茶飲系列',
    titleEn: 'Tea Collection',
    titleJa: 'お茶コレクション',
    descriptionZh: '嚴選台灣頂級茶園散葉茶，從烏龍到抹茶，每一杯都有故事。',
    descriptionEn: "Premium loose-leaf teas from Taiwan's finest gardens. From oolong to matcha, every cup tells a story.",
    descriptionJa: '台湾最高峰の茶園から厳選した茶葉。烏龍から抹茶まで。',
    badge: 'signature',
    priceTwd: 80,
    priceJpy: 400,
    image: '/images/menu/matcha.jpg',
    href: '/menu/drinks',
  },
  {
    titleZh: '咖啡系列',
    titleEn: 'Coffee',
    titleJa: 'コーヒー',
    descriptionZh: '單品與自家拼配咖啡，完美搭配我們的雞蛋仔。',
    descriptionEn: 'Single-origin and house blends, crafted to pair perfectly with our eggcakes.',
    descriptionJa: 'シングルオリジンとハウスブレンド、エッグケーキとの相性抜群。',
    badge: 'signature',
    priceTwd: 90,
    priceJpy: 450,
    image: '/images/menu/coffee.jpg',
    href: '/menu/drinks',
  },
];

export const eggcakeItems: MenuCardItem[] = [
  {
    nameZh: '原味雞蛋仔',
    nameEn: 'Original Eggcake',
    nameJa: 'オリジナルエッグケーキ',
    descriptionZh: '經典原味，外酥內軟QQ，品品的招牌必點。',
    descriptionEn: 'The classic. Crispy outside, QQ soft inside — our signature must-try.',
    descriptionJa: '定番の味。外はカリッと、中はもちもち。品品の看板メニュー。',
    priceTwd: 60,
    priceJpy: 300,
    badges: ['signature'],
    image: '/images/menu/eggcake.jpg',
  },
  {
    nameZh: '巧克力雞蛋仔',
    nameEn: 'Chocolate Eggcake',
    nameJa: 'チョコレートエッグケーキ',
    descriptionZh: '濃郁比利時巧克力，入口即化的甜蜜滋味。',
    descriptionEn: 'Rich Belgian chocolate that melts in your mouth with every bite.',
    descriptionJa: 'ベルギー産チョコレートの濃厚な味わい。',
    priceTwd: 70,
    priceJpy: 350,
    badges: ['signature'],
    image: '/images/menu/eggcake.jpg',
  },
  {
    nameZh: '抹茶雞蛋仔',
    nameEn: 'Matcha Eggcake',
    nameJa: '抹茶エッグケーキ',
    descriptionZh: '日本宇治抹茶，微苦回甘的大人味。',
    descriptionEn: 'Uji matcha from Japan — a refined, bittersweet flavor for grown-up palates.',
    descriptionJa: '宇治抹茶の上品なほろ苦さ。大人の味わい。',
    priceTwd: 75,
    priceJpy: 380,
    badges: ['signature'],
    image: '/images/menu/matcha.jpg',
  },
  {
    nameZh: '伯爵茶雞蛋仔',
    nameEn: 'Earl Grey Eggcake',
    nameJa: 'アールグレイエッグケーキ',
    descriptionZh: '伯爵茶的佛手柑香氣，優雅午後的最佳選擇。',
    descriptionEn: 'Bergamot-scented Earl Grey — the perfect afternoon indulgence.',
    descriptionJa: 'ベルガモット香るアールグレイ。優雅な午後のひととき。',
    priceTwd: 75,
    priceJpy: 380,
    badges: [],
  },
  {
    nameZh: '草莓季節限定雞蛋仔',
    nameEn: 'Strawberry Eggcake',
    nameJa: 'いちごエッグケーキ',
    descriptionZh: '新鮮草莓果醬與奶油，春季限定美味。',
    descriptionEn: 'Fresh strawberry jam and cream — a spring-only delight.',
    descriptionJa: 'フレッシュいちごジャムとクリーム。春限定の味わい。',
    priceTwd: 85,
    priceJpy: 420,
    badges: ['seasonal'],
    image: '/images/menu/strawberry.jpg',
  },
  {
    nameZh: '黑糖珍珠雞蛋仔',
    nameEn: 'Brown Sugar Boba Eggcake',
    nameJa: '黒糖タピオカエッグケーキ',
    descriptionZh: '黑糖珍珠配上QQ雞蛋仔，台灣風味全新體驗。',
    descriptionEn: 'Brown sugar boba meets QQ eggcake — a Taiwanese flavor adventure.',
    descriptionJa: '黒糖タピオカともちもちエッグケーキの新体験。',
    priceTwd: 80,
    priceJpy: 400,
    badges: ['new'],
  },
];

export const teaItems: MenuCardItem[] = [
  {
    nameZh: '高山烏龍茶',
    nameEn: 'High Mountain Oolong',
    nameJa: '高山ウーロン茶',
    descriptionZh: '來自阿里山的高山茶，花果香氣清新回甘。',
    descriptionEn: 'From Alishan — floral and fruity with a clean, sweet finish.',
    descriptionJa: '阿里山産の高山茶。花と果実の香り、爽やかな甘み。',
    priceTwd: 90,
    priceJpy: 450,
    badges: ['signature'],
    image: '/images/menu/matcha.jpg',
  },
  {
    nameZh: '日月潭紅茶',
    nameEn: 'Sun Moon Lake Black Tea',
    nameJa: '日月潭紅茶',
    descriptionZh: '台灣日月潭紅玉紅茶，濃郁薄荷與肉桂香。',
    descriptionEn: 'Ruby-18 from Sun Moon Lake — rich notes of mint and cinnamon.',
    descriptionJa: '日月潭の紅玉紅茶。ミントとシナモンの豊かな香り。',
    priceTwd: 85,
    priceJpy: 420,
    badges: ['signature'],
    image: '/images/menu/matcha.jpg',
  },
  {
    nameZh: '宇治抹茶拿鐵',
    nameEn: 'Uji Matcha Latte',
    nameJa: '宇治抹茶ラテ',
    descriptionZh: '日本宇治抹茶與鮮奶的完美結合。',
    descriptionEn: 'Uji matcha blended with fresh milk for a creamy, balanced cup.',
    descriptionJa: '宇治抹茶とフレッシュミルクの完璧なハーモニー。',
    priceTwd: 100,
    priceJpy: 500,
    badges: [],
    image: '/images/menu/matcha.jpg',
  },
];

export const coffeeItems: MenuCardItem[] = [
  {
    nameZh: '品品招牌拿鐵',
    nameEn: 'Pin Pin Signature Latte',
    nameJa: '品品シグネチャーラテ',
    descriptionZh: '自家拼配豆，中深焙，搭配細緻奶泡。',
    descriptionEn: 'Our house blend, medium-dark roast, with silky microfoam.',
    descriptionJa: '自家焙煎ブレンド、中深煎り、きめ細やかなミルクフォーム。',
    priceTwd: 100,
    priceJpy: 500,
    badges: ['signature'],
    image: '/images/menu/coffee.jpg',
  },
  {
    nameZh: '手沖單品咖啡',
    nameEn: 'Pour-Over Single Origin',
    nameJa: 'ハンドドリップシングルオリジン',
    descriptionZh: '每週更換產區，品味世界各地的風土。',
    descriptionEn: 'Rotating origins weekly — taste the terroir of the world.',
    descriptionJa: '毎週産地を変更。世界各地のテロワールを味わう。',
    priceTwd: 120,
    priceJpy: 600,
    badges: [],
    image: '/images/menu/coffee.jpg',
  },
  {
    nameZh: '冰釀咖啡',
    nameEn: 'Cold Brew',
    nameJa: 'コールドブリュー',
    descriptionZh: '24小時低溫萃取，順滑無苦澀。',
    descriptionEn: '24-hour cold extraction — smooth, clean, never bitter.',
    descriptionJa: '24時間低温抽出。滑らかで苦味のないクリーンな味わい。',
    priceTwd: 90,
    priceJpy: 450,
    badges: [],
    image: '/images/menu/coffee.jpg',
  },
];

export const seasonalItems: MenuCardItem[] = [
  eggcakeItems[4], // Strawberry
  {
    nameZh: '櫻花拿鐵',
    nameEn: 'Sakura Latte',
    nameJa: '桜ラテ',
    descriptionZh: '春季限定，櫻花糖漿與鮮奶的浪漫邂逅。',
    descriptionEn: 'Spring-only — sakura syrup meets fresh milk in a romantic cup.',
    descriptionJa: '春限定。桜シロップとフレッシュミルクのロマンチックな一杯。',
    priceTwd: 110,
    priceJpy: 550,
    badges: ['seasonal', 'limited'],
  },
  {
    nameZh: '芒果雞蛋仔',
    nameEn: 'Mango Eggcake',
    nameJa: 'マンゴーエッグケーキ',
    descriptionZh: '夏季限定，台灣愛文芒果的熱帶風情。',
    descriptionEn: 'Summer-only — tropical Taiwanese Irwin mango in every bite.',
    descriptionJa: '夏限定。台湾アーウィンマンゴーのトロピカルな味わい。',
    priceTwd: 85,
    priceJpy: 420,
    badges: ['seasonal'],
  },
];

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
