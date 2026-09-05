export type BowlTier = 'protein' | 'regular' | 'juices' | 'salads';
export type VegType = 'veg' | 'non-veg';

/**
 * IMAGE CROP STRATEGY FOR MENU CARDS
 * ═══════════════════════════════════════════════════════════════════
 *
 * CIRCULAR CROP (Current):
 *   • Use for centered, top-down bowl shots
 *   • Ideal for clean product photography looking directly down at the bowl
 *   • Shows full contents in a compact, elegant circle
 *   • Current implementation: 160px diameter with sage green (#8FC96B) border
 *
 * ROUNDED-SQUARE CROP (Future for non-standard shots):
 *   • Use for angled shots, close-ups, lifestyle photos
 *   • Use if the shot has hands, props, or content extending to edges
 *   • Use if critical content would be lost with circular crop
 *   • Implementation: border-radius: 2rem; with similar sage green border
 *
 * When adding new images:
 *   1. Check if it's a clean centered top-down shot → keep CIRCULAR
 *   2. If content extends to edges or it's angled → use ROUNDED-SQUARE
 *   3. Always maintain consistent styling: sage green border, drop shadow, hover scale
 */

export interface Bowl {
  id: string;
  name: string;
  tier: BowlTier;
  veg: VegType;
  kcal?: number;
  protein?: number;
  fiber?: number;
  price: number;
  image: string;
  volume?: string;
  ingredients?: string;
}

export const tierLabels: Record<BowlTier, string> = {
  'protein': 'Protein Bowls',
  'regular': 'Regular Bowls',
  'juices': 'Juices',
  'salads': 'Salads'
};

export const tierPrices: Record<BowlTier, string> = {
  'protein': '₹169-189/bowl',
  'regular': '₹199/bowl',
  'juices': '₹80/bottle',
  'salads': '₹149-169/bowl'
};

export const tierDescriptions: Record<BowlTier, string> = {
  'protein': 'Veg · 20-30g protein',
  'regular': 'Veg & Non-veg · ~33g protein',
  'juices': '100% Organic · Cold-pressed',
  'salads': 'Fresh · Veg & Non-veg'
};

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600`;

export const bowls: Bowl[] = [
  // PROTEIN BOWLS
  {
    id: 'nutrition-bowl',
    name: 'Nutrition Bowl',
    tier: 'protein',
    veg: 'veg',
    kcal: 520,
    protein: 22,
    fiber: 10,
    price: 169,
    image: '/assets/Nutrition bowl.webp',
  },
  {
    id: 'super-nutrition-bowl',
    name: 'Super Nutrition Bowl',
    tier: 'protein',
    veg: 'veg',
    kcal: 560,
    protein: 25,
    fiber: 12,
    price: 189,
    image: '/assets/Super nutrition bowll.webp',
  },
  {
    id: 'sprouted-moong-dragon-fruit',
    name: 'Sprouted Moong & Dragon Fruit Bowl',
    tier: 'protein',
    veg: 'veg',
    kcal: 410,
    protein: 18,
    fiber: 11,
    price: 169,
    image: '/assets/Sprouted Moong & Dragon Fruit Bowll.webp',
  },
  {
    id: 'soya-chunk-tikka-rice',
    name: 'Soya Chunk Tikka & Rice Bowl',
    tier: 'protein',
    veg: 'veg',
    kcal: 540,
    protein: 28,
    fiber: 9,
    price: 179,
    image: '/assets/soya chunk tikka & rice bowl.webp',
  },
  {
    id: 'paneer-tikka-quinoa',
    name: 'Paneer Tikka & Quinoa Bowl',
    tier: 'protein',
    veg: 'veg',
    kcal: 580,
    protein: 26,
    fiber: 8,
    price: 189,
    image: '/assets/paneer Tikka & quinoa bowl.webp',
  },
  {
    id: 'boiled-egg-quinoa',
    name: 'Boiled Egg & Quinoa Bowl',
    tier: 'protein',
    veg: 'non-veg',
    kcal: 490,
    protein: 30,
    fiber: 7,
    price: 179,
    image: '/assets/Boiled Egg&Quinoa bowl.webp',
  },
  {
    id: 'rajma-soya-brown-rice',
    name: 'Rajma & Soya Chunk Brown Rice Bowl',
    tier: 'protein',
    veg: 'veg',
    kcal: 550,
    protein: 27,
    fiber: 13,
    price: 179,
    image: '/assets/Rajma & Soya chunk,Brown rice Bowl.webp',
  },
  {
    id: 'chole-fuel',
    name: 'Chole Fuel Bowl',
    tier: 'protein',
    veg: 'veg',
    kcal: 517,
    protein: 20,
    fiber: 12,
    price: 149,
    image: '/assets/ChickPea Bowll.webp',
  },
  // REGULAR BOWLS
  {
    id: 'grilled-chicken-fajita',
    name: 'Grilled Chicken Fajita Bowl',
    tier: 'regular',
    veg: 'non-veg',
    kcal: 610,
    protein: 34,
    fiber: 8,
    price: 199,
    image: '/assets/Grilled Chicken Fajita Bowl.webp',
  },
  {
    id: 'tandoori-chicken',
    name: 'Tandoori Chicken Bowl',
    tier: 'regular',
    veg: 'non-veg',
    kcal: 621,
    protein: 36,
    fiber: 8,
    price: 199,
    image: '/assets/Tandoori Chicken Bowl.webp',
  },
  {
    id: 'grilled-creamy-chicken',
    name: 'Grilled Creamy Chicken Bowl',
    tier: 'regular',
    veg: 'non-veg',
    kcal: 630,
    protein: 35,
    fiber: 7,
    price: 199,
    image: '/assets/Grilled creamy chicken bowll.webp',
  },
  {
    id: 'grilled-paneer-chicken-quinoa',
    name: 'Grilled Paneer Chicken & Quinoa Bowl',
    tier: 'regular',
    veg: 'non-veg',
    kcal: 640,
    protein: 34,
    fiber: 9,
    price: 199,
    image: '/assets/Grilled paneerChicken & quinoa bowl.webp',
  },


  // JUICES — ₹80 (100% Organic · Cold-pressed)
  {
    id: 'detox-drink',
    name: 'Detox Drink',
    tier: 'juices',
    veg: 'veg',
    volume: '330 ml',
    ingredients: '330 ml',
    price: 80,
    image: '/assets/detox_drink.webp',
  },
  {
    id: 'fresh-orange-juice',
    name: 'Orange Juice',
    tier: 'juices',
    veg: 'veg',
    volume: '330 ml',
    ingredients: '300 ml',
    price: 80,
    image: '/assets/lemon_juice.webp',
  },
  {
    id: 'beetroot-juice',
    name: 'Beetroot Juice',
    tier: 'juices',
    veg: 'veg',
    volume: '330 ml',
    ingredients: '300 ml',
    price: 80,
    image: '/assets/beetroot_juice.webp',
  },
  {
    id: 'bitter-gourd-juice',
    name: 'Bitter Gourd Juice',
    tier: 'juices',
    veg: 'veg',
    volume: '330 ml',
    ingredients: '330 ml',
    price: 80,
    image: '/assets/bitterguard_juice.webp',
  },
  {
    id: 'Protien Shake',
    name: 'Protien Shake',
    tier: 'juices',
    veg: 'veg',
    volume: '330 ml',
    ingredients: '300 ml',
    price: 80,
    image: '/assets/Protien shake.webp',
  },
  // SALADS
  {
    id: 'green-veggie-salad',
    name: 'Green Veggie Salad Bowl',
    tier: 'salads',
    veg: 'veg',
    kcal: 280,
    protein: 12,
    fiber: 9,
    price: 149,
    image: '/assets/Green veggi salad bowl.webp',
  },
  {
    id: 'soya-chunk-salad',
    name: 'Soya Chunk Salad Bowl',
    tier: 'salads',
    veg: 'veg',
    kcal: 340,
    protein: 20,
    fiber: 10,
    price: 159,
    image: '/assets/Soya Chunk Salad Bowl.webp',
  },
  {
    id: 'creamy-corn-almond-salad',
    name: 'Creamy Corn & Almond Salad Bowl',
    tier: 'salads',
    veg: 'veg',
    kcal: 360,
    protein: 14,
    fiber: 8,
    price: 159,
    image: '/assets/Creamy corn & almond salad Bowll.webp',
  },
  {
    id: 'spicy-egg-salad',
    name: 'Spicy Egg Salad Bowl',
    tier: 'salads',
    veg: 'non-veg',
    kcal: 320,
    protein: 22,
    fiber: 6,
    price: 169,
    image: '/assets/Spicy Egg Salad Bowl.webp',
  },
  {
    id: 'rajma-salad',
    name: 'Rajma Salad Bowl',
    tier: 'salads',
    veg: 'veg',
    kcal: 350,
    protein: 18,
    fiber: 12,
    price: 159,
    image: '/assets/Rajma salad Bowl.webp',
  },
  {
    id: 'beetroot-chickpea-salad',
    name: 'Beetroot & Chickpea Salad Bowl',
    tier: 'salads',
    veg: 'veg',
    kcal: 330,
    protein: 16,
    fiber: 11,
    price: 159,
    image: '/assets/Beetroot & chickpea bowl.webp',
  },
  // {
  //   id: 'tofu-bowl',
  //   name: 'Tofu Bowl',
  //   tier: 'regular',
  //   veg: 'veg',
  //   kcal: 590,
  //   protein: 28,
  //   fiber: 10,
  //   price: 199,
  //   image: px(34227771),
  // },
  // LARGE BOWLS — ₹249
  // {
  //   id: 'peri-peri-chicken-large',
  //   name: 'Peri Peri Chicken Bowl Large',
  //   tier: 'large',
  //   veg: 'non-veg',
  //   kcal: 835,
  //   protein: 49,
  //   fiber: 11,
  //   price: 249,
  //   image: px(32986472),
  // },
  // {
  //   id: 'hot-spicy-chicken-large',
  //   name: 'Hot & Spicy Chicken Bowl Large',
  //   tier: 'large',
  //   veg: 'non-veg',
  //   kcal: 838,
  //   protein: 49,
  //   fiber: 11,
  //   price: 249,
  //   image: px(32986476),
  // },
  // {
  //   id: 'tandoori-chicken-large',
  //   name: 'Tandoori Chicken Bowl Large',
  //   tier: 'large',
  //   veg: 'non-veg',
  //   kcal: 832,
  //   protein: 49,
  //   fiber: 11,
  //   price: 249,
  //   image: px(9646858),
  // },
  // {
  //   id: 'tofu-bowl-large',
  //   name: 'Tofu Bowl Large',
  //   tier: 'large',
  //   veg: 'veg',
  //   kcal: 790,
  //   protein: 38,
  //   fiber: 13,
  //   price: 249,
  //   image: px(1484522),
  // },
  // {
  //   id: 'paneer-tikka-large',
  //   name: 'Paneer Tikka Bowl Large',
  //   tier: 'large',
  //   veg: 'veg',
  //   kcal: 848,
  //   protein: 42,
  //   fiber: 12,
  //   price: 249,
  //   image: px(19081131),
  // },
  // {
  //   id: 'peri-peri-paneer-large',
  //   name: 'Peri Peri Paneer Bowl Large',
  //   tier: 'large',
  //   veg: 'veg',
  //   kcal: 852,
  //   protein: 42,
  //   fiber: 12,
  //   price: 249,
  //   image: px(16716140),
  // },
];

export const bowlMap: Record<string, Bowl> = Object.fromEntries(
  bowls.map((b) => [b.id, b])
);
