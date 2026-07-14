const configuredApiBase = window.GIVE_TAKE_API_BASE || "";
const isLocalFrontend = location.protocol === "file:"
  || ["localhost", "127.0.0.1", "::1"].includes(location.hostname);
const API_BASE = isLocalFrontend ? "http://localhost:4173" : configuredApiBase;
const ADMIN_TOKEN_KEY = "give_take_admin_token";
const ADMIN_SESSION_HINT_KEY = "give_take_admin_session_hint";
const CUSTOMER_TOKEN_KEY = "give_take_customer_token";
const CUSTOMER_SESSION_HINT_KEY = "give_take_customer_session_hint";
const CUSTOMER_USER_KEY = "give_take_customer_user";
const CUSTOMER_WALLET_KEY = "give_take_customer_wallet";
const CUSTOMER_ORDERS_KEY = "give_take_customer_orders";
const CART_STATE_KEY = "give_take_cart_state";
const REFERRAL_ATTRIBUTION_KEY = "give_take_referral_attribution";
const REFERRAL_TRACKED_KEY = "give_take_referral_tracked";
const CATALOG_CACHE_VERSION = 5;
const CATALOG_CACHE_KEY = `give_take_catalog_cache_v${CATALOG_CACHE_VERSION}`;
const LATEST_CATALOG_CACHE_KEY = "give_take_catalog_cache_latest";
const CATALOG_CACHE_PREFIX = "give_take_catalog_cache_v";
const LEGACY_CATALOG_CACHE_KEYS = ["give_take_catalog_cache"];
const SUPABASE_URL = window.GIVE_TAKE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = window.GIVE_TAKE_SUPABASE_ANON_KEY || "";
const authClient = window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const fallbackCategories = [
  { id: "mobiles", name: "Mobiles", text: "Phones with IMEI, lock, battery, display, and diagnostic checks." },
  { id: "electronics", name: "Electronics", text: "Laptops, tablets, headphones, speakers, and smart devices." },
  { id: "books", name: "Books", text: "Study books, course sets, exam material, and novels." },
  { id: "fashion", name: "Clothes & Shoes", text: "Clean, verified wearable items and accessories." },
  { id: "home", name: "Home & Kitchen", text: "Useful household, kitchen, decor, and appliance items." },
  { id: "bags", name: "Bags", text: "Backpacks, handbags, luggage, and office bags." },
  { id: "toys", name: "Toys & More", text: "Toys, hobby items, bundles, and low-value useful items." },
];

const recategorizedProductIds = new Set(["gtl13", "gtl21", "gtl28", "gtl36", "gtl40", "gtl53"]);

const SERVICE_CITIES_TEXT = "Lucknow, Ayodhya, Gonda";
const homeCategoryIds = ["electronics", "books", "fashion", "home", "bags", "toys"];
const customerSellBlockedCategoryIds = new Set(["fashion", "clothes", "shoes", "clothes-shoes", "clothes_and_shoes"]);
const pausedShoppingCategoryIds = new Set(["fashion", "clothes", "shoes", "clothes-shoes", "clothes_and_shoes"]);
const categoryIcons = {
  electronics: '<svg viewBox="0 0 24 24"><path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M11 18h2"/></svg>',
  books: '<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M4 19a2.5 2.5 0 0 1 2.5-2H20"/><path d="M8 7h8"/></svg>',
  fashion: '<svg viewBox="0 0 24 24"><path d="M9 4 6 6 3 7l2 5 3-1v9h8v-9l3 1 2-5-3-1-3-2"/><path d="M9 4a3 3 0 0 0 6 0"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-6h4v6"/></svg>',
  bags: '<svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>',
  toys: '<svg viewBox="0 0 24 24"><path d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8L6.8 19l1-5.8-4.2-4.1 5.8-.8L12 3Z"/></svg>',
  default: '<svg viewBox="0 0 24 24"><path d="M4 7h16v10H4z"/><path d="M8 7V5h8v2"/></svg>',
};
const DELIVERY_CHARGE = 50;
const DELIVERY_FREE_THRESHOLD = 799;

const fallbackProducts = [
  {
    id: "gtl01",
    title: "Disposable Waterproof Shower Cap for Women - 1 Pack",
    category: "home",
    city: "Lucknow",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 615,
    sold: 5,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/3.jpg?v=1761747759",
    status: "listed",
    quantity: 1,
    newest: 55,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/disposable-shower-caps"
  },
  {
    id: "gtl02",
    title: "Reusable Transparent Double-Sided Nano Adhesive Gel Pad (1 Pc)",
    category: "home",
    city: "Ayodhya",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 606,
    sold: 4,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/23577_01_without_sku_3253db29-3b47-47e0-a828-eb877ccb2615.jpg?v=1780294178",
    status: "listed",
    quantity: 1,
    newest: 54,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/reusable-transparent-double-sided-nano-adhesive-gel-wall-sticker-pad-grip-1-pc"
  },
  {
    id: "gtl03",
    title: "Transparent Self Adhesive Wall Hook Holder – Punch Free, Strong & Durable",
    category: "home",
    city: "Gonda",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 597,
    sold: 21,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/23576_01_without_sku_b58c1620-3502-41fa-a24b-ed07bd24d875.jpg?v=1780140882",
    status: "listed",
    quantity: 1,
    newest: 53,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/transparent-self-adhesive-wall-hook-holder-punch-free-for-kitchen-bathroom-1-pc"
  },
  {
    id: "gtl04",
    title: "Transparent Self-Adhesive Wall Sticker Hook – Nail-Free, Waterproof (1 Pc)",
    category: "home",
    city: "Lucknow",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 588,
    sold: 20,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/23572_01_without_sku_7ffa6339-c40f-4f53-b214-adfc4f9d165f.jpg?v=1780126525",
    status: "listed",
    quantity: 1,
    newest: 52,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/transparent-self-adhesive-wall-sticker-hook-punch-free-for-keys-hanging-1-pc"
  },
  {
    id: "gtl05",
    title: "Anti-Fray Spiral Cable Protector (2-Pack) – Durable Silicone/TPU Guard",
    category: "electronics",
    city: "Ayodhya",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 579,
    sold: 19,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/CordProtective-WOSKU-01.jpg?v=1759924408",
    status: "listed",
    quantity: 1,
    newest: 51,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/mobile-cable-grip"
  },
  {
    id: "gtl06",
    title: "Angel Silicone Data Cable Protector - Durable 2-in-1 Cord Saver",
    category: "electronics",
    city: "Gonda",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 570,
    sold: 18,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/02_67d8ac65-23b4-4c0d-95d9-8e5ac9356c5d.jpg?v=1750909279",
    status: "listed",
    quantity: 1,
    newest: 50,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/silicone-data-cable-protector-2-in1-cord-saver-cover"
  },
  {
    id: "gtl07",
    title: "Micro USB OTG Adapter – Portable USB Connector for Smartphones",
    category: "electronics",
    city: "Lucknow",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 561,
    sold: 17,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/02_Adapter.jpg?v=1759553846",
    status: "listed",
    quantity: 1,
    newest: 49,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/usb-c-otg-adapter-1-pc"
  },
  {
    id: "gtl08",
    title: "Midnight Spice Refreshing Wet Wipes for Face, Body & Hands (1 Pc)",
    category: "fashion",
    city: "Ayodhya",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 552,
    sold: 16,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/RefreshingWetWipe02-01.jpg?v=1779688276",
    status: "listed",
    quantity: 1,
    newest: 48,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/midnight-spice-refreshing-wet-wipes-face-body-hand-cleansing-1-pc"
  },
  {
    id: "gtl09",
    title: "Reusable Silicone Swimming Ear Plugs Set - Comfortable & Waterproof",
    category: "fashion",
    city: "Gonda",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 543,
    sold: 15,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/WhatsAppImage2025-09-27at9.54.16AM_a64b066d-aa84-4f24-8f8a-50f69d26d220.jpg?v=1759317669",
    status: "listed",
    quantity: 1,
    newest: 47,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/reusable-silicone-swimming-ear-plugs-set"
  },
  {
    id: "gtl10",
    title: "Anti-Sweat Thumb & Finger Sleeves for Mobile Gaming (1 Pair)",
    category: "electronics",
    city: "Lucknow",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 534,
    sold: 14,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/3image_36eafacf-fbf8-408f-8d59-0f9af160dee4.jpg?v=1722922521",
    status: "listed",
    quantity: 1,
    newest: 46,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/thumb-finger-sleeve-mobile-games-gaming-sleeve"
  },
  {
    id: "gtl11",
    title: "Transparent Zip Lock Bag 33x23 cm – Durable & Reusable Storage",
    category: "bags",
    city: "Ayodhya",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 525,
    sold: 13,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/transparentZipLockPouches-WOSKU-01.jpg?v=1775046506",
    status: "listed",
    quantity: 1,
    newest: 45,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/transparent-plastic-zip-lock-bag-1-pc-33x23-cm"
  },
  {
    id: "gtl12",
    title: "Effervescent Car Wiper Detergent Tablets for Clear Windshield",
    category: "home",
    city: "Gonda",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 516,
    sold: 12,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/products/721402.jpg?v=1737631045",
    status: "listed",
    quantity: 1,
    newest: 44,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/car-wiper-detergent-effervescent-tablets-washer"
  },
  {
    id: "gtl13",
    title: "Plastic Hand Mobile Stand (Mix Color / 1 Pc)",
    category: "electronics",
    city: "Lucknow",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 507,
    sold: 11,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/05_345ca402-89e9-4f72-b996-c4b59e9b816a.jpg?v=1751025748",
    status: "listed",
    quantity: 1,
    newest: 43,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/14318_hand_mobile_stand_1pc"
  },
  {
    id: "gtl14",
    title: "Soft Noise Reduction Ear Plugs – Comfortable & Reusable Pair",
    category: "home",
    city: "Ayodhya",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 498,
    sold: 10,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/EarPlugs-WOSKU-01.jpg?v=1767595979",
    status: "listed",
    quantity: 1,
    newest: 42,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/soft-noise-reduction-ear-plugs-1-pair"
  },
  {
    id: "gtl15",
    title: "Soft Bristle Kids Toothbrush – Gentle Grip for Daily Oral Care",
    category: "toys",
    city: "Gonda",
    price: 50,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 489,
    sold: 9,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/01_brush_65dcc414-23c0-4ea7-abb1-0252d741eff6.jpg?v=1767692500",
    status: "listed",
    quantity: 1,
    newest: 41,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/soft-bristle-kids-toothbrush-1-pc"
  },
  {
    id: "gtl16",
    title: "Glass Premium Oil Spray Bottle 300ml - Fine Mist Dispenser",
    category: "home",
    city: "Lucknow",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 480,
    sold: 8,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/02_oil-bottle.jpg?v=1759918949",
    status: "listed",
    quantity: 1,
    newest: 40,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/premium-oil-spray-bottle-300-ml-1-pc"
  },
  {
    id: "gtl17",
    title: "Sky Blue Lotus Design Gold Tone Jhumka Earrings with Pearl Beads",
    category: "fashion",
    city: "Ayodhya",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 471,
    sold: 7,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/J4IQNzJHtY.jpg?v=1779972730",
    status: "listed",
    quantity: 1,
    newest: 39,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/sky-blue-lotus-design-gold-tone-jhumka-earrings-with-pearl-beads"
  },
  {
    id: "gtl18",
    title: "4-Compartment Plastic Dish Set with Spoon & Fork – Versatile Dinner & Pav Bhaji Plate",
    category: "home",
    city: "Gonda",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 462,
    sold: 6,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/products/7_97284e7c-a87d-4d7c-a876-f7a3ee5665e6.jpg?v=1751020558",
    status: "listed",
    quantity: 1,
    newest: 38,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/2037-4compartment-dish-with-spoon-and-fork2-dish-set-with-1spoon-and-1fork-dinner-plate-plastic-compartment-plate-pav-bhaji-plate-4-compartments-divided-plastic-food-plate"
  },
  {
    id: "gtl19",
    title: "Swizzy Jelly 500ml Tumbler with Straw – Stylish & Reusable",
    category: "home",
    city: "Lucknow",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 453,
    sold: 5,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/Sipper-Bottle-1.jpg?v=1776847724",
    status: "listed",
    quantity: 1,
    newest: 37,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/stylish-swizzy-jelly-tumbler-with-straw-and-fun-lid-1-pc-500ml"
  },
  {
    id: "gtl20",
    title: "Heart-Shaped Grater & Slicer Set for Fruits & Vegetables",
    category: "home",
    city: "Ayodhya",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 444,
    sold: 4,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/01_64192fbb-9cb6-43a3-90cd-8bc5555cb385.jpg?v=1745666634",
    status: "listed",
    quantity: 1,
    newest: 36,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/2965-heart-grater-set-and-heart-grater-slicer-used-widely-for-grating-and-slicing-of-fruits-vegetables-cheese-etc-including-all-kitchen-purposes"
  },
  {
    id: "gtl21",
    title: "Bicycle-Shaped Plastic Flower Pot Stand for Home Decor",
    category: "home",
    city: "Gonda",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 435,
    sold: 21,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/01_20cc7ccb-9298-4d4b-b437-e112320162c0.jpg?v=1741672544",
    status: "listed",
    quantity: 1,
    newest: 35,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/plastic-cycle-flower-vases-for-home-decor-bicycle-flower-pot-stand-1-pc"
  },
  {
    id: "gtl22",
    title: "Soft Plastic Toothbrush Set with Portable Round Box – 20 pcs",
    category: "home",
    city: "Lucknow",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 426,
    sold: 20,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/03_689007d6-abd5-4e02-acd8-fbd95f95b1c5.jpg?v=1751115694",
    status: "listed",
    quantity: 1,
    newest: 34,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/13198_pla_soft_toothbrush_10pc_set"
  },
  {
    id: "gtl23",
    title: "Silver Plated Ad Stone Double Line Bracelet",
    category: "fashion",
    city: "Ayodhya",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 417,
    sold: 19,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/b4nxpoxptG.jpg?v=1761650973",
    status: "listed",
    quantity: 1,
    newest: 33,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/silver-plated-ad-stone-double-line-bracelet"
  },
  {
    id: "gtl24",
    title: "Graceful AD Bracelet with flower motif for women",
    category: "fashion",
    city: "Gonda",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 408,
    sold: 18,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/yrHB9kG074.png?v=1767781830",
    status: "listed",
    quantity: 1,
    newest: 32,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/graceful-ad-bracelet-with-flower-motif-for-women"
  },
  {
    id: "gtl25",
    title: "Sparkling AD Floral Design Bracelet For party wear",
    category: "fashion",
    city: "Lucknow",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 399,
    sold: 17,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/rlDgB1afrt.png?v=1767781830",
    status: "listed",
    quantity: 1,
    newest: 31,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/sparkling-ad-floral-design-bracelet-for-party-wear"
  },
  {
    id: "gtl26",
    title: "3 Compartment Lunch Box with Spoon & Fork Space - BPA Free",
    category: "home",
    city: "Ayodhya",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 390,
    sold: 16,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/0J0NNS4SHp.jpg?v=1769076349",
    status: "listed",
    quantity: 1,
    newest: 30,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/3-compartment-lunch-box-with-spoon-and-fork-space"
  },
  {
    id: "gtl27",
    title: "Portable Mini USB Fan, Light & 3-Port USB Hub Combo",
    category: "electronics",
    city: "Gonda",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 381,
    sold: 15,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/01_09d06b38-6095-44e6-a340-d2dd86836934.jpg?v=1767781418",
    status: "listed",
    quantity: 1,
    newest: 29,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/mini-usb-fan-usb-light-3-port-hub-combo"
  },
  {
    id: "gtl28",
    title: "Premium Big Desktop Mobile Phone Stand Holder for Smartphones",
    category: "electronics",
    city: "Lucknow",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 372,
    sold: 14,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/phoneHolder-WOSKU-01_a0a72634-4f36-42fb-aa41-1ae44e79413d.jpg?v=1767411832",
    status: "listed",
    quantity: 1,
    newest: 28,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/premium-big-desktop-mobile-phone-stand-holder-for-smartphones-1-pc"
  },
  {
    id: "gtl29",
    title: "Plastic Medium Size Cane Fruit Baskets",
    category: "home",
    city: "Ayodhya",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 363,
    sold: 13,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/products/248205.jpg?v=1750912867",
    status: "listed",
    quantity: 1,
    newest: 27,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/2482-plastic-medium-size-cane-fruit-baskets"
  },
  {
    id: "gtl30",
    title: "Mini Bag Sealer, 2 in 1 Seal & Cutter Heat Sealers",
    category: "bags",
    city: "Gonda",
    price: 200,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 354,
    sold: 12,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/3030322.webp?v=1776688450",
    status: "listed",
    quantity: 1,
    newest: 26,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/mini-bag-sealer-2-in-1-seal-cutter-heat-sealers"
  },
  {
    id: "gtl31",
    title: "Water Floating Smokeless Candles & Lotus Flowers Sensor Led TeaLight (Pack of 6)",
    category: "electronics",
    city: "Lucknow",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 345,
    sold: 11,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/09_7c5f4b8b-0f28-48c3-ad08-a4d4b9b68830.jpg?v=1737627580",
    status: "listed",
    quantity: 1,
    newest: 25,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/6556-water-floating-smokeless-candles-lotus-flowers-sensor-led-tealight-for-outdoor-and-indoor-decoration-pack-of-6-candle-candle-pack-of-6"
  },
  {
    id: "gtl32",
    title: "46pcs Metal 1 / 4\"\" Socket Set (Black, 46pcs)",
    category: "home",
    city: "Ayodhya",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 336,
    sold: 10,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/0452_b1f1c4e1-adb2-4f8f-9d49-9276bc00dd67.jpg?v=1769171990",
    status: "listed",
    quantity: 1,
    newest: 24,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/46-piece-metal-socket-set"
  },
  {
    id: "gtl33",
    title: "Heavy-Duty Furniture Lifter & Shifting Tool Set",
    category: "home",
    city: "Gonda",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 327,
    sold: 9,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/products/7image_1a79ec66-96d3-4271-b158-c4cb7228c094.jpg?v=1737634058",
    status: "listed",
    quantity: 1,
    newest: 23,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/1619c-heavy-furniture-lifter-and-furniture-shifting-tool-1"
  },
  {
    id: "gtl34",
    title: "Crystal Design LED Flameless Tealight Candles (6 Pc)",
    category: "electronics",
    city: "Lucknow",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 318,
    sold: 8,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/LightDiya-WOSKU-01.jpg?v=1758514971",
    status: "listed",
    quantity: 1,
    newest: 22,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/crystal-design-led-flameless-tealight-candles-6-pc"
  },
  {
    id: "gtl35",
    title: "Kids Educational Laptop Learning Toy with Alphabets & Music",
    category: "toys",
    city: "Ayodhya",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 309,
    sold: 7,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/22123_01_without_sku_26072e9b-18ab-425f-ae3a-bbcbe09c3f8e.jpg?v=1780379965",
    status: "listed",
    quantity: 1,
    newest: 21,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/kids-educational-laptop-learning-toy-with-numbers-alphabets-music-for-kids-1-pc"
  },
  {
    id: "gtl36",
    title: "Happy Birthday LED Acrylic Message Lamp with Wooden Base | Decorative Table Light",
    category: "home",
    city: "Gonda",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 300,
    sold: 6,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/gxZoF2d7D2.jpg?v=1770106701",
    status: "listed",
    quantity: 1,
    newest: 20,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/happy-birthday-led-acrylic-message-lamp-with-wooden-base-decorative-table-light"
  },
  {
    id: "gtl37",
    title: "Romantic Heart Love Decorative Gift Set (1 Set)",
    category: "home",
    city: "Lucknow",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 291,
    sold: 5,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/LoveCombo-WOSKU-01.jpg?v=1769855861",
    status: "listed",
    quantity: 1,
    newest: 19,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/romantic-heart-love-decorative-gift-set-1-set"
  },
  {
    id: "gtl38",
    title: "Mechanical Walking Dinosaur Toy with LED Lights, Sound Effects and Pull-Along Action for Kids",
    category: "electronics",
    city: "Ayodhya",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 282,
    sold: 4,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/PVEZ0PzEhN.jpg?v=1780146885",
    status: "listed",
    quantity: 1,
    newest: 18,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/mechanical-walking-dinosaur-toy-with-led-lights-sound-effects-and-pull-along-action-for-kids"
  },
  {
    id: "gtl39",
    title: "Interactive Pull-Along Frog Toy with Colorful LED Lights & Music for Toddlers",
    category: "electronics",
    city: "Gonda",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 273,
    sold: 21,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/3LDYd4lPiK.jpg?v=1780146886",
    status: "listed",
    quantity: 1,
    newest: 17,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/interactive-pull-along-frog-toy-with-colorful-led-lights-music-for-toddlers"
  },
  {
    id: "gtl40",
    title: "Romantic Heart Love Table Decor Gift Set (1 Set)",
    category: "home",
    city: "Lucknow",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 264,
    sold: 20,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/02_ad553cc2-392b-451a-9b42-631f30e759e9.jpg?v=1769858225",
    status: "listed",
    quantity: 1,
    newest: 16,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/romantic-heart-love-table-decor-gift-set-1-set"
  },
  {
    id: "gtl41",
    title: "Customize Stainless Steel Vacuum Insulated Water Bottle | Leak Proof Flask for Tea Coffee | Reusable Water Bottle with Hanging Strap | Bottle for Hot & Cold Drinks Wide Mouth Water Flask 1200 ML",
    category: "electronics",
    city: "Ayodhya",
    price: 400,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 255,
    sold: 19,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/4_7d6f3586-7203-4868-b4b6-bb19b23a72dd.jpg?v=1737618223",
    status: "listed",
    quantity: 1,
    newest: 15,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/ss-vacuum-insulated-water-bottle-1200-ml"
  },
  {
    id: "gtl42",
    title: "Topper Cool Water Premium Car Perfume With Rich Fregrence (50ml)",
    category: "home",
    city: "Gonda",
    price: 410,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 246,
    sold: 18,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/1cd5bee5-dcea-4784-9b69-9e7ac6d3a047.jpg?v=1742900960",
    status: "listed",
    quantity: 1,
    newest: 14,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/topper-cool-water-premium-car-perfume-with-rich-fregrence-50ml"
  },
  {
    id: "gtl43",
    title: "Personalized Temperature Water Bottle & Chocolate Set (Multi Circle Box / 2 Pc Set)",
    category: "home",
    city: "Lucknow",
    price: 410,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 237,
    sold: 17,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/001_ed0626ef-2cda-4bc7-ad4e-55046f9b0a80.jpg?v=1737618597",
    status: "listed",
    quantity: 1,
    newest: 13,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/personalized-temprature-water-bottle-chocolate-with-attractive-multi-circle-box-2-pc-set"
  },
  {
    id: "gtl44",
    title: "Personalized Temperature Water Bottle with Rose Almond Chocolate 2 Pc Mix Color",
    category: "home",
    city: "Ayodhya",
    price: 410,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 228,
    sold: 16,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/02_7e4eb14b-e6a0-4184-8a20-4baaee27c1da.jpg?v=1733401048",
    status: "listed",
    quantity: 1,
    newest: 12,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/personalized-temperature-water-bottle-rose-almond-chocolate-with-attractive-peacock-box-2-pc-set-mix-color-bottle"
  },
  {
    id: "gtl45",
    title: "Personalized Temperature Water Bottle Decorative Light with Kesar Pista Almond Chocolate 3 Pc",
    category: "electronics",
    city: "Gonda",
    price: 420,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 219,
    sold: 15,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/03_d834bcfb-cfab-4b15-979d-d8443bee5a8c.jpg?v=1737618509",
    status: "listed",
    quantity: 1,
    newest: 11,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/personalized-temperature-water-bottle-decorative-light-kesar-pista-almond-chocolate-with-attractive-peacock-box-3-pc-set"
  },
  {
    id: "gtl46",
    title: "LED Round Static Grey Sand Art Lamp | Modern Ambient Decorative Night Light",
    category: "electronics",
    city: "Lucknow",
    price: 420,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 210,
    sold: 14,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/9t22Dk0XVk.jpg?v=1767781752",
    status: "listed",
    quantity: 1,
    newest: 10,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/led-round-static-grey-sand-art-lamp-modern-ambient-decorative-night-light"
  },
  {
    id: "gtl47",
    title: "Insulated 5.5L Water Jug for Cool, Odorless Hydration",
    category: "home",
    city: "Ayodhya",
    price: 420,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 201,
    sold: 13,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/Water-Jug-02_3944ad91-c267-4299-a1df-f798dafaaf8e.jpg?v=1760002481",
    status: "listed",
    quantity: 1,
    newest: 9,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/12263_crystal_water_jug_5_5ltr"
  },
  {
    id: "gtl48",
    title: "M12 Max Wireless Earbuds, Black Touch Control Bluetooth",
    category: "electronics",
    city: "Gonda",
    price: 420,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 192,
    sold: 12,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/products/05_eea997e4-ab37-43e2-9977-bd78ffefe476.jpg?v=1737635364",
    status: "listed",
    quantity: 1,
    newest: 8,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/6705_true_wireless_airbuds_m12max"
  },
  {
    id: "gtl49",
    title: "Creative Solar Drummer Car Aromatherapy, Solar Powered Car Air Freshener (1 Pc)",
    category: "home",
    city: "Lucknow",
    price: 420,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 183,
    sold: 11,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/02_d5496b47-e5a9-4749-a4ed-dc840b4ec8d3.jpg?v=1750933727",
    status: "listed",
    quantity: 1,
    newest: 7,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/18332-creative-solar-power-aromatherapy-car-air-freshner"
  },
  {
    id: "gtl50",
    title: "Personalized Temperature Water Bottle, (2 Pc Set), Mix Color",
    category: "home",
    city: "Ayodhya",
    price: 420,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 174,
    sold: 10,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/266cd06d-0273-4037-a538-6707067854b5_535276ca-8310-4cfb-bdf3-19faa8f6d40e.jpg?v=1758196294",
    status: "listed",
    quantity: 1,
    newest: 6,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/whl146-19712-coffee-bottle-box-cpr"
  },
  {
    id: "gtl51",
    title: "Vikas Cast Iron Dosa Tawa 29 cm – Durable & Naturally Non-Stick",
    category: "home",
    city: "Gonda",
    price: 1099,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 165,
    sold: 9,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/b8DXFXVQal.png?v=1780660278",
    status: "listed",
    quantity: 1,
    newest: 5,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/vikas-cast-iron-dosa-tawa-29-cm-with-long-handle-naturally-non-stick-extra-durable"
  },
  {
    id: "gtl52",
    title: "Kids inflatable sofa chair with backrest & Foot Air Pump (1 Set 85x74 Cm Approx)",
    category: "toys",
    city: "Lucknow",
    price: 1099,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 156,
    sold: 8,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/01_02a99679-f927-49c0-a98c-dd43244e7b4e.jpg?v=1737616845",
    status: "listed",
    quantity: 1,
    newest: 4,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/18230-inflatable-air-sofa-with-air-pump"
  },
  {
    id: "gtl53",
    title: "2 in 1 Plastic Keychain with Mobile Stand / Phone Holder (100 Pcs Set / Multicolor)",
    category: "electronics",
    city: "Ayodhya",
    price: 1099,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 147,
    sold: 7,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/01_bfdfcc92-a02f-441d-9777-29933ffb35a5.jpg?v=1737620909",
    status: "listed",
    quantity: 1,
    newest: 3,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/2-in-1-plastic-keychain-mobile-stand-100pcs-set"
  },
  {
    id: "gtl54",
    title: "Portable Stainless Steel Foldable Barbecue Grill (1 Pc)",
    category: "home",
    city: "Gonda",
    price: 1099,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 138,
    sold: 6,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/CharcoalBBQ-WOSKU-01.jpg?v=1777453440",
    status: "listed",
    quantity: 1,
    newest: 2,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/portable-stainless-steel-foldable-barbecue-grill-1-pc"
  },
  {
    id: "gtl55",
    title: "Abstract Praying Lady Sculpture – Modern Matte Finish Showpiece",
    category: "home",
    city: "Lucknow",
    price: 1099,
    condition: "New",
    source: "GIVE & TAKE Verified",
    views: 129,
    sold: 5,
    badges: [
      "Launch Inventory",
      "Supplier Sourced"
    ],
    checks: [
      "GIVE & TAKE verified",
    ],
    artA: "#d3f4e9",
    artB: "#3a6e63",
    imageUrl: "https://deodap.in/cdn/shop/files/6rlJHY9zEE.jpg?v=1776684092",
    status: "listed",
    quantity: 1,
    newest: 1,
    returnWindowHours: 48,
    owner: "give-and-take",
    sourceType: "launch-supplier-inventory",
    supplierUrl: "https://deodap.in/products/abstract-praying-lady-sculpture-decorative-home-showpiece"
  }
];
const fallbackHomeKitchenProducts = [
  {
    "id": "hk01",
    "title": "Glass Tumbler With Straw, Lid & Leather Sleeve - Portable & Stylish",
    "price": 63,
    "category": "home",
    "city": "Lucknow",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 720,
    "sold": 26,
    "imageUrl": "https://deodap.in/cdn/shop/files/8UR2OC61Qc.jpg?v=1776856123",
    "newest": 1000,
    "imageCount": 8
  },
  {
    "id": "hk02",
    "title": "Professional-Grade Stainless Steel Vegetable Cleaver Knife 1 Pc",
    "price": 56,
    "category": "home",
    "city": "Ayodhya",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 711,
    "sold": 25,
    "imageUrl": "https://deodap.in/cdn/shop/files/01_cf89d252-05a8-4b5f-b488-649a8e5ca30d.jpg?v=1769171900",
    "newest": 999,
    "imageCount": 7
  },
  {
    "id": "hk03",
    "title": "DeoDap Transparent Waterproof Heavy Duty Self-Adhesive Wall Hook",
    "price": 3.36,
    "category": "home",
    "city": "Gonda",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 702,
    "sold": 24,
    "imageUrl": "https://deodap.in/cdn/shop/files/Hook-1.jpg?v=1776842596",
    "newest": 998,
    "imageCount": 9
  },
  {
    "id": "hk04",
    "title": "Leakproof 450ml Glass Water Bottle For Outdoor & Sports",
    "price": 99,
    "category": "home",
    "city": "Lucknow",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 693,
    "sold": 23,
    "imageUrl": "https://deodap.in/cdn/shop/files/01_f0158a81-c2ef-481d-9430-311382fede6b.jpg?v=1737615940",
    "newest": 997,
    "imageCount": 7
  },
  {
    "id": "hk05",
    "title": "Cute Mini Panda Night Light Lamp (1 Pc)",
    "price": 98,
    "category": "home",
    "city": "Ayodhya",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 684,
    "sold": 22,
    "imageUrl": "https://deodap.in/cdn/shop/files/Lightpanda-WOSKU-01.jpg?v=1774331864",
    "newest": 996,
    "imageCount": 9
  },
  {
    "id": "hk06",
    "title": "Premium Coconut Opener Tool / Driller With Comfortable Grip",
    "price": 30,
    "category": "home",
    "city": "Gonda",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 675,
    "sold": 21,
    "imageUrl": "https://deodap.in/cdn/shop/products/5a03f578a2ef5509bf8a2b70-1-large.jpg?v=1750851930",
    "newest": 995,
    "imageCount": 7
  },
  {
    "id": "hk07",
    "title": "VelvaBloom Waterproof Disposable Shower Cap - 10 Pack",
    "price": 0,
    "category": "home",
    "city": "Lucknow",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 666,
    "sold": 20,
    "imageUrl": "https://deodap.in/cdn/shop/files/3.jpg?v=1761747759",
    "newest": 994,
    "imageCount": 11
  },
  {
    "id": "hk08",
    "title": "Beauty Face Massage Ice Roller (1 Pc)",
    "price": 28,
    "category": "home",
    "city": "Ayodhya",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 657,
    "sold": 19,
    "imageUrl": "https://deodap.in/cdn/shop/files/01_9cea5e9c-9214-4fd3-bb07-a4f9f80d7f81.jpg?v=1737617976",
    "newest": 993,
    "imageCount": 7
  },
  {
    "id": "hk09",
    "title": "Multi-Purpose Plastic Wall Mounted Mobile Charging Holder Set (4 Pc)",
    "price": 80,
    "category": "home",
    "city": "Gonda",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 648,
    "sold": 18,
    "imageUrl": "https://deodap.in/cdn/shop/files/02_dae2a0b9-783b-4eff-918f-ee75d33b1f6f.jpg?v=1771313070",
    "newest": 992,
    "imageCount": 7
  },
  {
    "id": "hk10",
    "title": "Ocean Insulated Water Jug With Tap - BPA-Free",
    "price": 216,
    "category": "home",
    "city": "Lucknow",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 639,
    "sold": 17,
    "imageUrl": "https://deodap.in/cdn/shop/files/ru5JONiHAO.jpg?v=1777380985",
    "newest": 991,
    "imageCount": 6
  },
  {
    "id": "hk11",
    "title": "750W Electric Sandwich & Panini Maker - Double-Sided, Non-Stick",
    "price": 795,
    "category": "home",
    "city": "Ayodhya",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 630,
    "sold": 16,
    "imageUrl": "https://deodap.in/cdn/shop/files/21df1db2-13f1-4cae-b097-4646355bad51.jpg?v=1737617649",
    "newest": 990,
    "imageCount": 10
  },
  {
    "id": "hk12",
    "title": "Smokeless Electric Indoor Barbecue Grill, 2000w",
    "price": 867,
    "category": "home",
    "city": "Gonda",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 621,
    "sold": 15,
    "imageUrl": "https://deodap.in/cdn/shop/products/1_fee79a3d-7b47-4f56-b72e-0b0e22e9a831.jpg?v=1737631031",
    "newest": 989,
    "imageCount": 8
  },
  {
    "id": "hk13",
    "title": "Kitchen Food Processor (Chop N Churn)",
    "price": 121,
    "category": "home",
    "city": "Lucknow",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 612,
    "sold": 14,
    "imageUrl": "https://deodap.in/cdn/shop/products/1_980f9b7a-5676-4c1d-a756-d7bcef131eda.jpg?v=1737629483",
    "newest": 988,
    "imageCount": 6
  },
  {
    "id": "hk14",
    "title": "Portable Ultrasonic Jewellery Cleaner High-Frequency Vibration Machine",
    "price": 84,
    "category": "home",
    "city": "Ayodhya",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 603,
    "sold": 13,
    "imageUrl": "https://deodap.in/cdn/shop/files/02_e2f6d4fc-c53f-4005-a6af-bf547936d74f.jpg?v=1751263917",
    "newest": 987,
    "imageCount": 8
  },
  {
    "id": "hk15",
    "title": "Stainless Steel Round Roaster Grill With Wooden Handle - 7.6x13 In",
    "price": 99,
    "category": "home",
    "city": "Gonda",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 594,
    "sold": 12,
    "imageUrl": "https://deodap.in/cdn/shop/files/SteelJaliRoasterGrill-WOSKU-01.jpg?v=1774850440",
    "newest": 986,
    "imageCount": 8
  },
  {
    "id": "hk16",
    "title": "Power Free Blender",
    "price": 66,
    "category": "home",
    "city": "Lucknow",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 585,
    "sold": 11,
    "imageUrl": "https://deodap.in/cdn/shop/files/0060_power_free_blender.jpg?v=1745572967",
    "newest": 985,
    "imageCount": 11
  },
  {
    "id": "hk17",
    "title": "Apex Power-X Triple Stainless Steel Blades And Hand-Pull Vegetable Chopper",
    "price": 140,
    "category": "home",
    "city": "Ayodhya",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 576,
    "sold": 10,
    "imageUrl": "https://deodap.in/cdn/shop/files/01_605b09bc-2596-43ba-879e-cb674ebb53fc.jpg?v=1745040067",
    "newest": 984,
    "imageCount": 7
  },
  {
    "id": "hk18",
    "title": "Nilkanth Splash 6000 Stainless Steel Insulated Water Dispenser - 6L",
    "price": 591,
    "category": "home",
    "city": "Gonda",
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "badges": [
      "DeoDap Product",
      "Screenshot Matched"
    ],
    "checks": [
      "GIVE & TAKE verified",
      "Admin price editable"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "status": "listed",
    "quantity": 1,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "views": 567,
    "sold": 9,
    "imageUrl": "https://deodap.in/cdn/shop/files/CFRsOR7K1Q.jpg?v=1773662418",
    "newest": 983,
    "imageCount": 7
  }
];
const fallbackElectronicsProducts = [
  {
    "id": "el01",
    "title": "VR Headset for Smartphones - Immersive 3D Mobile Glasses",
    "category": "electronics",
    "city": "Lucknow",
    "price": 248,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 690,
    "sold": 24,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/01_cce4cffc-ef30-4cc8-bf82-e685db1de0a5.jpg?v=1772454352",
    "status": "listed",
    "quantity": 1,
    "newest": 900,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 8
  },
  {
    "id": "el02",
    "title": "LCD Writing Tablet Pencil Case with Calculator 1 Pc",
    "category": "electronics",
    "city": "Ayodhya",
    "price": 153,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 682,
    "sold": 23,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/LCDWritingTabletPencilBox-WOSKU-1.jpg?v=1773997288",
    "status": "listed",
    "quantity": 1,
    "newest": 899,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 9
  },
  {
    "id": "el03",
    "title": "Camera & Mobile Tripod",
    "category": "electronics",
    "city": "Gonda",
    "price": 299,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 674,
    "sold": 22,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/products/4_98b27e7c-6714-4df9-ae02-ef694e6d5901.jpg?v=1737629155",
    "status": "listed",
    "quantity": 1,
    "newest": 898,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 6
  },
  {
    "id": "el04",
    "title": "Pocket Mini Bluetooth Thermal Printer with 1 Roll Paper - Wireless, Portable",
    "category": "electronics",
    "city": "Lucknow",
    "price": 726,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 666,
    "sold": 21,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/61l-OM9K72L._SL1500_e0a450d7-a3ba-4cc1-a8a9-bbf4b20321fd.jpg?v=1737616248",
    "status": "listed",
    "quantity": 1,
    "newest": 897,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 10
  },
  {
    "id": "el05",
    "title": "USB Vibration Full Body Massager",
    "category": "electronics",
    "city": "Ayodhya",
    "price": 100,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 658,
    "sold": 20,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/products/02_b7309ff7-09cb-4669-9b0f-11c16348b529.jpg?v=1737631801",
    "status": "listed",
    "quantity": 1,
    "newest": 896,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 12
  },
  {
    "id": "el06",
    "title": "Multi-Purpose Plastic Wall Mounted Mobile Charging Holder Set (4 Pc)",
    "category": "electronics",
    "city": "Gonda",
    "price": 80,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 650,
    "sold": 19,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/02_dae2a0b9-783b-4eff-918f-ee75d33b1f6f.jpg?v=1771313070",
    "status": "listed",
    "quantity": 1,
    "newest": 895,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 7
  },
  {
    "id": "el07",
    "title": "Electric Sonic Toothbrush with Extra Head & 2 AA Batteries",
    "category": "electronics",
    "city": "Lucknow",
    "price": 59,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 642,
    "sold": 18,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_main.jpg?v=1778563092",
    "status": "listed",
    "quantity": 1,
    "newest": 894,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 9
  },
  {
    "id": "el08",
    "title": "Digital Weighing Scale (10 Kg)",
    "category": "electronics",
    "city": "Ayodhya",
    "price": 184,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 634,
    "sold": 17,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/products/03_6b0a2503-8b86-48ce-9c70-b363cdc1fcf8.jpg?v=1737629208",
    "status": "listed",
    "quantity": 1,
    "newest": 893,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 8
  },
  {
    "id": "el09",
    "title": "Solar Wall Lamp Wireless Outdoor Light with Motion Sensor & 3 Modes",
    "category": "electronics",
    "city": "Gonda",
    "price": 190,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 626,
    "sold": 16,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/08_41f723d0-703e-479d-a3ee-6269447cd192.jpg?v=1737625784",
    "status": "listed",
    "quantity": 1,
    "newest": 892,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 9
  },
  {
    "id": "el10",
    "title": "Mahadev 3D Crystal Ball Night Light (1 Pc)",
    "category": "electronics",
    "city": "Lucknow",
    "price": 381,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 618,
    "sold": 15,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/Crystal-ball-night-light-01.jpg?v=1765255387",
    "status": "listed",
    "quantity": 1,
    "newest": 891,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 9
  },
  {
    "id": "el11",
    "title": "Ganpati Bapa 3D Crystal Ball Night Light with LED Illumination (1 Pc)",
    "category": "electronics",
    "city": "Ayodhya",
    "price": 373,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 610,
    "sold": 14,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/3dGlassGanpatiji-WOSKU-01.png?v=1765255573",
    "status": "listed",
    "quantity": 1,
    "newest": 890,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 9
  },
  {
    "id": "el12",
    "title": "Mini Handheld Rechargeable USB Fan with Stand - Portable Desk Fan",
    "category": "electronics",
    "city": "Gonda",
    "price": 125,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 602,
    "sold": 13,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/21638-01-no-sku_0f25e2d9-89d2-4b49-b406-d9fd861c6022.jpg?v=1781094445",
    "status": "listed",
    "quantity": 1,
    "newest": 889,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 9
  },
  {
    "id": "el13",
    "title": "Multi-Function LED Desk Lamp with Pen Holder & Phone Stand",
    "category": "electronics",
    "city": "Lucknow",
    "price": 219,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 594,
    "sold": 12,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/6XoILWxXri.png?v=1777121723",
    "status": "listed",
    "quantity": 1,
    "newest": 888,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 8
  },
  {
    "id": "el14",
    "title": "50mm Real Glass Magnifying Lens for Reading - Breakage-Proof",
    "category": "electronics",
    "city": "Ayodhya",
    "price": 14,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 586,
    "sold": 11,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/047_8cf82c0c-6c94-4363-bed8-210568b05ddb.jpg?v=1750845063",
    "status": "listed",
    "quantity": 1,
    "newest": 887,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 8
  },
  {
    "id": "el15",
    "title": "Mobile Holder Astronaut Phone Stand Planet Creative Fun 3D Design (1 Pc / Mix Design)",
    "category": "electronics",
    "city": "Gonda",
    "price": 99,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 578,
    "sold": 10,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/01_8d5c4877-a713-4aef-b859-ac071f6bf21d.jpg?v=1750928757",
    "status": "listed",
    "quantity": 1,
    "newest": 886,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 11
  },
  {
    "id": "el16",
    "title": "Multi-Purpose Yellow Wall Holder Stand for Mobile Charging",
    "category": "electronics",
    "city": "Lucknow",
    "price": 58,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 570,
    "sold": 9,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/products/34_e0cd29ea-b437-464e-ace7-08b492160bfc.jpg?v=1737634031",
    "status": "listed",
    "quantity": 1,
    "newest": 885,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 7
  },
  {
    "id": "el17",
    "title": "Mini Flexible Tripod Stand for Mobile Phones with Clip Holder",
    "category": "electronics",
    "city": "Ayodhya",
    "price": 79,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 562,
    "sold": 8,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/9814-01-no-sku_b1115cb2-0e70-420d-b92d-be75164ea35a.jpg?v=1780663846",
    "status": "listed",
    "quantity": 1,
    "newest": 884,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 9
  },
  {
    "id": "el18",
    "title": "Wireless Bluetooth 5.3 In-Ear Earbuds with Noise Cancelling & LED Display",
    "category": "electronics",
    "city": "Gonda",
    "price": 228,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 554,
    "sold": 7,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/03_d5a8c020-9e05-4eec-95de-d3222dcdf89e.jpg?v=1751289031",
    "status": "listed",
    "quantity": 1,
    "newest": 883,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 7
  },
  {
    "id": "el19",
    "title": "ZW-053 Wireless Bluetooth Over-Ear Headphones with Mic",
    "category": "electronics",
    "city": "Lucknow",
    "price": 395,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 546,
    "sold": 6,
    "badges": [
      "DeoDap Product"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/02_80783d0a-96ed-4ee0-9112-4beb21cb3996.jpg?v=1744344099",
    "status": "listed",
    "quantity": 1,
    "newest": 882,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "checks": [
      "GIVE & TAKE verified"
    ],
    "imageCount": 8
  }
];

fallbackProducts.splice(
  0,
  fallbackProducts.length,
  ...fallbackHomeKitchenProducts,
  ...fallbackElectronicsProducts,
  ...fallbackProducts.filter(product => !["home", "electronics"].includes(product.category) || recategorizedProductIds.has(product.id))
);

const legacyPriceOverrides = loadLegacyPriceOverrides();
purgeLegacyCatalogCache();
const cachedCatalog = loadCachedCatalog();
let categories = cachedCatalog?.categories || [...fallbackCategories];
let products = cachedCatalog?.products || [];
let productDetails = new Map();
let productDetailRequests = new Map();
let backendDataReady = Boolean(cachedCatalog);
let adminToken = loadStoredAdminToken();
let customerToken = loadStoredCustomerToken();
let currentUser = loadCachedCustomerUser();
let authRestorePending = Boolean(customerToken && !currentUser);
let customerDataReady = !customerToken;
let wallet = loadCachedWallet();
let orders = loadCachedOrders();
let sellRequests = [];
let adminDashboard = null;
let adminCustomers = null;
let adminCustomersLoading = false;
let adminReferrals = null;
let adminReferralsLoading = false;
let partnerTasks = [];
let partnerTasksLoaded = false;
let pendingLoginEmail = "";
let pendingLoginName = "";
let platformConfig = {
  integrations: {
    payments: {
      upi: { merchantName: "GIVE & TAKE", upiId: "", note: "" }
    }
  }
};

function cleanReferralCode(value) {
  const code = String(value || "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 50);
  return /^[a-z0-9][a-z0-9_-]{1,49}$/.test(code) ? code : "";
}

function loadReferralAttribution() {
  try {
    const referral = JSON.parse(localStorage.getItem(REFERRAL_ATTRIBUTION_KEY) || "null");
    const code = cleanReferralCode(referral?.code);
    const capturedAtMs = new Date(referral?.capturedAt || "").getTime();
    const maxAgeMs = 60 * 24 * 60 * 60 * 1000;
    if (!code || !Number.isFinite(capturedAtMs) || Date.now() - capturedAtMs > maxAgeMs) {
      localStorage.removeItem(REFERRAL_ATTRIBUTION_KEY);
      return null;
    }
    return {
      code,
      source: String(referral.source || "instagram").slice(0, 40),
      landingPage: String(referral.landingPage || "").slice(0, 220),
      capturedAt: new Date(capturedAtMs).toISOString(),
    };
  } catch {
    localStorage.removeItem(REFERRAL_ATTRIBUTION_KEY);
    return null;
  }
}

function saveReferralAttribution(referral) {
  if (!referral?.code) return;
  try {
    localStorage.setItem(REFERRAL_ATTRIBUTION_KEY, JSON.stringify(referral));
  } catch {}
}

async function trackReferralVisit(referral) {
  if (!referral?.code) return;
  const todayKey = new Date().toISOString().slice(0, 10);
  const trackingKey = `${referral.code}:${todayKey}`;
  if (localStorage.getItem(REFERRAL_TRACKED_KEY) === trackingKey) return;
  try {
    await api("/api/referrals/track", {
      method: "POST",
      body: JSON.stringify({ referral }),
    });
    localStorage.setItem(REFERRAL_TRACKED_KEY, trackingKey);
  } catch (error) {
    console.warn("Referral visit tracking skipped:", error.message);
  }
}

function captureReferralFromUrl() {
  const params = new URLSearchParams(window.location.search || "");
  const code = cleanReferralCode(params.get("ref") || params.get("referral") || params.get("influencer"));
  if (!code) return loadReferralAttribution();
  const referral = {
    code,
    source: "instagram",
    landingPage: `${location.pathname}${location.search}${location.hash}`.slice(0, 220),
    capturedAt: new Date().toISOString(),
  };
  saveReferralAttribution(referral);
  trackReferralVisit(referral);
  return referral;
}

function loadStoredAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  return localStorage.getItem(ADMIN_SESSION_HINT_KEY) === "1" ? "cookie-session" : "";
}

function markAdminSessionActive() {
  adminToken = "cookie-session";
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.setItem(ADMIN_SESSION_HINT_KEY, "1");
}

function clearAdminSession() {
  adminToken = "";
  adminDashboard = null;
  adminCustomers = null;
  adminCustomersLoading = false;
  adminReferrals = null;
  adminReferralsLoading = false;
  partnerTasks = [];
  partnerTasksLoaded = false;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_SESSION_HINT_KEY);
}

function loadStoredCustomerToken() {
  const legacyToken = localStorage.getItem(CUSTOMER_TOKEN_KEY) || "";
  localStorage.removeItem(CUSTOMER_TOKEN_KEY);
  if (legacyToken) return legacyToken;
  return localStorage.getItem(CUSTOMER_SESSION_HINT_KEY) === "1" ? "cookie-session" : "";
}

function markCustomerSessionActive() {
  customerToken = "cookie-session";
  localStorage.removeItem(CUSTOMER_TOKEN_KEY);
  localStorage.setItem(CUSTOMER_SESSION_HINT_KEY, "1");
}

function clearCustomerSession() {
  customerToken = "";
  localStorage.removeItem(CUSTOMER_TOKEN_KEY);
  localStorage.removeItem(CUSTOMER_SESSION_HINT_KEY);
  localStorage.removeItem(CUSTOMER_USER_KEY);
  localStorage.removeItem(CUSTOMER_WALLET_KEY);
  localStorage.removeItem(CUSTOMER_ORDERS_KEY);
  currentUser = null;
  authRestorePending = false;
  customerDataReady = true;
  document.documentElement.classList.remove("has-customer-token");
}

function normalizeWallet(nextWallet) {
  return nextWallet && typeof nextWallet.balance === "number"
    ? { balance: nextWallet.balance, ledger: Array.isArray(nextWallet.ledger) ? nextWallet.ledger : [] }
    : { balance: 0, ledger: [] };
}

function loadCachedWallet() {
  try {
    return normalizeWallet(JSON.parse(localStorage.getItem(CUSTOMER_WALLET_KEY) || "null"));
  } catch {
    return { balance: 0, ledger: [] };
  }
}

function cacheWallet(nextWallet) {
  localStorage.setItem(CUSTOMER_WALLET_KEY, JSON.stringify(normalizeWallet(nextWallet)));
}

function loadCachedOrders() {
  try {
    const cached = JSON.parse(localStorage.getItem(CUSTOMER_ORDERS_KEY) || "null");
    return cached?.userId === getCurrentUserId() && Array.isArray(cached.orders) ? cached.orders : [];
  } catch {
    return [];
  }
}

function cacheOrders(nextOrders) {
  const userId = getCurrentUserId();
  if (!userId) return;
  localStorage.setItem(CUSTOMER_ORDERS_KEY, JSON.stringify({
    userId,
    orders: Array.isArray(nextOrders) ? nextOrders : [],
  }));
}

function loadSavedCartState() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STATE_KEY) || "{}");
    const cart = Array.isArray(saved.cart) ? saved.cart.filter(Boolean) : [];
    return {
      cart,
      cartQuantities: saved.cartQuantities && typeof saved.cartQuantities === "object" ? saved.cartQuantities : {},
      checkoutStep: cart.length && ["cart", "delivery", "review"].includes(saved.checkoutStep) ? saved.checkoutStep : "cart",
      deliveryDetails: saved.deliveryDetails && typeof saved.deliveryDetails === "object" ? saved.deliveryDetails : {},
    };
  } catch {
    return { cart: [], cartQuantities: {}, checkoutStep: "cart", deliveryDetails: {} };
  }
}

function saveCartState() {
  try {
    if (!state.cart.length) {
      localStorage.removeItem(CART_STATE_KEY);
      return;
    }
    localStorage.setItem(CART_STATE_KEY, JSON.stringify({
      cart: state.cart,
      cartQuantities: state.cartQuantities,
      checkoutStep: state.checkoutStep,
      deliveryDetails: state.deliveryDetails,
    }));
  } catch {}
}

const savedCartState = loadSavedCartState();

const state = {
  route: "home",
  category: null,
  productId: null,
  cart: savedCartState.cart,
  cartQuantities: savedCartState.cartQuantities,
  checkoutStep: savedCartState.checkoutStep,
  deliveryDetails: savedCartState.deliveryDetails,
  pendingRemoveCartId: null,
  query: "",
  rechargeAmount: null,
  orderFilter: "all",
  expandedOrderId: null,
  orderSuccessNotice: null,
  addressBookEditing: false,
  sellPhotoFiles: [],
  adminCollapsed: {
    sellRequests: true,
    recharges: true,
    orders: true,
    joinApplications: true,
    archivedItems: true,
  },
  adminOrderView: "active",
  adminSearch: "",
  adminSection: "overview",
  adminShowProducts: false,
  adminAgent: {
    loading: false,
    action: "audit",
    result: null,
    error: "",
  },
};

const els = {
  pages: [...document.querySelectorAll(".page")],
  categoryGrid: document.getElementById("categoryGrid"),
  featuredProducts: document.getElementById("featuredProducts"),
  productGrid: document.getElementById("productGrid"),
  categoryProducts: document.getElementById("categoryProducts"),
  categoryTitle: document.getElementById("categoryTitle"),
  productDetail: document.getElementById("productDetail"),
  categoryFilter: document.getElementById("categoryFilter"),
  cityFilter: document.getElementById("cityFilter"),
  sortFilter: document.getElementById("sortFilter"),
  searchInput: document.getElementById("searchInput"),
  sellCategory: document.getElementById("sellCategory"),
  dynamicFields: document.getElementById("dynamicFields"),
  rechargeGrid: document.getElementById("rechargeGrid"),
  ledgerList: document.getElementById("ledgerList"),
  cartView: document.getElementById("cartView"),
  ordersGrid: document.getElementById("ordersGrid"),
  accountGrid: document.getElementById("accountGrid"),
  adminGrid: document.getElementById("adminGrid"),
  partnerTasks: document.getElementById("partnerTasks"),
  walletBalance: document.getElementById("walletBalance"),
};

async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const adminCookieRequest = options.admin || path === "/api/admin/login" || path === "/api/admin/logout";
  const customerCookieRequest = options.customer || path === "/api/auth/verify-otp" || path === "/api/auth/logout";
  if (adminCookieRequest) headers["X-Give-Take-Admin-Request"] = "1";
  if (customerCookieRequest) headers["X-Give-Take-Customer-Request"] = "1";
  if (options.admin && adminToken && adminToken !== "cookie-session") headers.Authorization = `Bearer ${adminToken}`;
  if (options.customer && customerToken && customerToken !== "cookie-session") headers.Authorization = `Bearer ${customerToken}`;
  const fetchOptions = { ...options };
  delete fetchOptions.headers;
  delete fetchOptions.admin;
  delete fetchOptions.customer;
  if (adminCookieRequest || customerCookieRequest) fetchOptions.credentials = "include";
  const response = await fetch(`${API_BASE}${path}`, {
    headers,
    ...fetchOptions,
  });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401 && options.admin) clearAdminSession();
    const error = new Error(data.error || "Request failed");
    error.status = response.status;
    throw error;
  }
  return data;
}

function filenameFromContentDisposition(value) {
  const header = String(value || "");
  const utfMatch = header.match(/filename\*=UTF-8''([^;]+)/i);
  if (utfMatch) return decodeURIComponent(utfMatch[1].replace(/["']/g, ""));
  const match = header.match(/filename="?([^";]+)"?/i);
  return match ? match[1] : "";
}

async function downloadAdminBackup(button) {
  if (!adminToken) {
    alert("Admin login required.");
    return;
  }
  const originalText = button?.textContent || "Download Backup";
  try {
    if (button) {
      button.disabled = true;
      button.textContent = "Preparing backup...";
    }
    const response = await fetch(`${API_BASE}/api/admin/backup/export`, {
      method: "GET",
      credentials: "include",
      headers: {
        "X-Give-Take-Admin-Request": "1"
      }
    });
    if (!response.ok) {
      let message = "Backup download failed";
      try {
        const data = await response.json();
        message = data.error || message;
      } catch {}
      if (response.status === 401) clearAdminSession();
      throw new Error(message);
    }
    const blob = await response.blob();
    const filename = filenameFromContentDisposition(response.headers.get("Content-Disposition"))
      || `give-take-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
    alert("Backup downloaded. Keep this file private and safe.");
  } catch (error) {
    alert(error.message);
    if (!adminToken) renderAdmin();
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function loadCachedCustomerUser() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMER_USER_KEY) || "null");
  } catch {
    return null;
  }
}

function loadCachedCatalog() {
  try {
    const cacheKeys = [LATEST_CATALOG_CACHE_KEY, CATALOG_CACHE_KEY];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith(CATALOG_CACHE_PREFIX) && !cacheKeys.includes(key)) cacheKeys.push(key);
    }
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    const cached = cacheKeys
      .map(key => {
        try {
          const catalog = JSON.parse(localStorage.getItem(key) || "null");
          return catalog ? { key, catalog } : null;
        } catch {
          return null;
        }
      })
      .filter(item => {
        const catalog = item?.catalog;
        return catalog
          && catalog.version === CATALOG_CACHE_VERSION
          && Date.now() - Number(catalog.savedAt || 0) <= maxAgeMs
          && Array.isArray(catalog.categories)
          && Array.isArray(catalog.products)
          && catalog.products.length;
      })
      .sort((a, b) => Number(b.catalog.savedAt || 0) - Number(a.catalog.savedAt || 0))[0]?.catalog;
    if (!cached) return null;
    return {
      categories: cached.categories,
      products: cached.products,
    };
  } catch {
    return null;
  }
}

function loadLegacyPriceOverrides() {
  try {
    const catalogs = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith(CATALOG_CACHE_PREFIX) || key === CATALOG_CACHE_KEY) continue;
      try {
        const catalog = JSON.parse(localStorage.getItem(key) || "null");
        if (catalog && Array.isArray(catalog.products)) catalogs.push(catalog);
      } catch {}
    }
    const latestLegacyCatalog = catalogs
      .filter(catalog => catalog.version !== CATALOG_CACHE_VERSION)
      .sort((a, b) => Number(b.savedAt || 0) - Number(a.savedAt || 0))[0];
    if (!latestLegacyCatalog) return new Map();
    return new Map(latestLegacyCatalog.products
      .filter(product => product?.id && product.updatedAt && Number.isFinite(Number(product.price)))
      .map(product => [product.id, { price: Number(product.price), updatedAt: product.updatedAt }]));
  } catch {
    return new Map();
  }
}

function applyRecoveredPrice(product) {
  const recovered = legacyPriceOverrides.get(product?.id);
  return recovered && shouldApplyRecoveredPrice(product, recovered)
    ? { ...product, price: recovered.price, updatedAt: recovered.updatedAt }
    : product;
}

function shouldApplyRecoveredPrice(serverProduct, recovered) {
  if (!serverProduct || !recovered) return false;
  const serverUpdatedAt = Date.parse(serverProduct.updatedAt || "");
  const recoveredUpdatedAt = Date.parse(recovered.updatedAt || "");
  return !Number.isFinite(serverUpdatedAt)
    || (Number.isFinite(recoveredUpdatedAt) && recoveredUpdatedAt > serverUpdatedAt);
}

async function persistRecoveredPrices(serverProducts) {
  if (!adminToken || !legacyPriceOverrides.size) return;
  const serverProductsById = new Map((serverProducts || []).map(product => [product.id, product]));
  const updates = [...legacyPriceOverrides.entries()].filter(([productId, recovered]) => {
    const serverProduct = serverProductsById.get(productId);
    if (!shouldApplyRecoveredPrice(serverProduct, recovered)) {
      legacyPriceOverrides.delete(productId);
      return false;
    }
    return Number(serverProduct.price) !== recovered.price;
  });
  const results = await Promise.allSettled(updates.map(([productId, recovered]) => api(`/api/admin/products/${encodeURIComponent(productId)}`, {
    method: "PATCH",
    admin: true,
    body: JSON.stringify({ price: recovered.price }),
  })));
  results.forEach((result, index) => {
    if (result.status === "fulfilled") legacyPriceOverrides.delete(updates[index][0]);
  });
}

function purgeLegacyCatalogCache() {
  try {
    LEGACY_CATALOG_CACHE_KEYS.forEach(key => localStorage.removeItem(key));
  } catch {}
}

function clearCatalogCache() {
  try {
    localStorage.removeItem(CATALOG_CACHE_KEY);
    localStorage.removeItem(LATEST_CATALOG_CACHE_KEY);
    LEGACY_CATALOG_CACHE_KEYS.forEach(key => localStorage.removeItem(key));
  } catch {}
}

function cacheCatalog() {
  try {
    const catalog = JSON.stringify({
      version: CATALOG_CACHE_VERSION,
      savedAt: Date.now(),
      categories,
      products,
    });
    localStorage.setItem(CATALOG_CACHE_KEY, catalog);
    localStorage.setItem(LATEST_CATALOG_CACHE_KEY, catalog);
  } catch {}
}

function saveProductToCachedCatalog(updatedProduct) {
  if (!updatedProduct?.id) return;
  const productIndex = products.findIndex(product => product.id === updatedProduct.id);
  if (productIndex === -1) {
    products = [updatedProduct, ...products];
  } else {
    products = products.map(product => product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product);
  }
  productDetails.set(updatedProduct.id, { ...(productDetails.get(updatedProduct.id) || {}), ...updatedProduct });
  backendDataReady = Boolean(products.length);
  cacheCatalog();
}

async function loadBackendData() {
  try {
    const userId = getCurrentUserId();
    const [configData, categoryData, productData, walletData, orderData, sellRequestData] = await Promise.all([
      api("/api/config"),
      api("/api/categories"),
      api("/api/products?sort=trending"),
      userId ? api(`/api/wallet/${encodeURIComponent(userId)}`, { customer: true }) : Promise.resolve({ wallet: { balance: 0, ledger: [] } }),
      userId ? api("/api/orders", { customer: true }) : Promise.resolve({ orders: [] }),
      userId ? api("/api/sell-requests", { customer: true }) : Promise.resolve({ sellRequests: [] }),
    ]);
    categories = categoryData.categories;
    products = productData.products.map(applyRecoveredPrice);
    await persistRecoveredPrices(productData.products);
    cacheCatalog();
    productDetails = new Map(
      products
        .filter(product => Array.isArray(product.images) && product.images.length)
        .map(product => [product.id, product])
    );
    wallet = normalizeWallet(walletData.wallet);
    cacheWallet(wallet);
    orders = orderData.orders;
    cacheOrders(orders);
    sellRequests = sellRequestData.sellRequests || [];
    platformConfig = configData;
    if (adminToken) await loadProtectedData();
    backendDataReady = true;
    return true;
  } catch (error) {
    console.warn("Could not load latest backend catalog:", error.message);
    if (!products.length) {
      productDetails.clear();
      productDetailRequests.clear();
      backendDataReady = false;
    }
    return false;
  }
}

function getCurrentUserId() {
  return currentUser?.id || "";
}

function requireCustomerLogin() {
  if (getCurrentUserId()) return true;
  alert("Please login first.");
  location.hash = "auth";
  return false;
}

async function refreshCurrentWallet() {
  const userId = getCurrentUserId();
  if (!userId) {
    wallet = { balance: 0, ledger: [] };
    localStorage.removeItem(CUSTOMER_WALLET_KEY);
    return;
  }
  const data = await api(`/api/wallet/${encodeURIComponent(userId)}`, { customer: true });
  wallet = normalizeWallet(data.wallet);
  cacheWallet(wallet);
}

async function loadAuthUser() {
  if (!customerToken) {
    clearCustomerSession();
    return;
  }
  try {
    const data = await api("/api/auth/me", { customer: true });
    currentUser = data.user || null;
    wallet = normalizeWallet(data.wallet);
    cacheWallet(wallet);
    localStorage.removeItem(CUSTOMER_TOKEN_KEY);
    localStorage.setItem(CUSTOMER_SESSION_HINT_KEY, "1");
    document.documentElement.classList.toggle("has-customer-token", Boolean(currentUser));
    if (currentUser) localStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(currentUser));
  } catch (error) {
    if (error.status === 401) {
      clearCustomerSession();
    }
  } finally {
    authRestorePending = false;
    customerDataReady = true;
  }
}

function renderAuthStatus() {
  const authLink = document.getElementById("authNavLink");
  const heroLoginLink = document.getElementById("heroLoginLink");
  const cartNavLink = document.getElementById("cartNavLink");
  const hasCustomerSession = Boolean(currentUser) || authRestorePending;
  if (authLink) {
    authLink.innerHTML = `<span class="login-label">Login</span><span class="account-label">My Account</span>`;
    authLink.dataset.short = hasCustomerSession ? "Account" : "Login";
    authLink.href = hasCustomerSession ? "#account" : "#auth";
  }
  if (cartNavLink) {
    const count = state.cart.reduce((sum, id) => sum + Number(state.cartQuantities[id] || 1), 0);
    const badge = cartNavLink.querySelector(".cart-count-badge");
    if (badge) badge.textContent = count;
    cartNavLink.dataset.short = `Cart ${count}`;
  }
  if (heroLoginLink) {
    heroLoginLink.innerHTML = `<span class="login-label">Login</span><span class="account-label">My Account</span>`;
    heroLoginLink.href = hasCustomerSession ? "#account" : "#auth";
  }
}

function setSubmitState(form, isSubmitting, label = "Submitting...") {
  const button = form?.querySelector("button[type='submit']");
  if (!button) return;
  if (isSubmitting) {
    if (!button.dataset.originalText) button.dataset.originalText = button.textContent;
    button.disabled = true;
    button.textContent = label;
    return;
  }
  button.disabled = false;
  button.textContent = button.dataset.originalText || button.textContent;
}

async function loadProtectedData() {
  adminDashboard = await api("/api/admin/dashboard?summary=1", { admin: true });
}

async function loadFullAdminData() {
  adminDashboard = await api("/api/admin/dashboard", { admin: true });
}

async function loadAdminCustomers() {
  if (!adminToken || adminCustomersLoading) return;
  adminCustomersLoading = true;
  renderAdmin();
  try {
    adminCustomers = await api("/api/admin/customers?limit=200", { admin: true });
  } finally {
    adminCustomersLoading = false;
    renderAdmin();
  }
}

async function loadAdminReferrals() {
  if (!adminToken || adminReferralsLoading) return;
  adminReferralsLoading = true;
  renderAdmin();
  try {
    adminReferrals = await api("/api/admin/referrals?limit=100", { admin: true });
  } finally {
    adminReferralsLoading = false;
    renderAdmin();
  }
}

async function loadPartnerTasks() {
  if (!adminToken) return;
  const taskData = await api("/api/partner/tasks", { admin: true });
  partnerTasks = taskData.tasks;
  partnerTasksLoaded = true;
}

async function refreshAdminProducts() {
  const [adminData, productData] = await Promise.all([
    api("/api/admin/dashboard", { admin: true }),
    api("/api/products?sort=trending"),
  ]);
  adminDashboard = {
    ...adminData,
    products: (adminData.products || []).map(applyRecoveredPrice),
  };
  products = productData.products.map(applyRecoveredPrice);
  productDetails.clear();
  productDetailRequests.clear();
  clearCatalogCache();
  cacheCatalog();
  renderAdmin();
  renderProducts();
  renderProductDetail();
}

function formatCoins(value) {
  return `<span class="coin-amount">${new Intl.NumberFormat("en-IN").format(value)} <span class="coin-symbol" aria-label="G&T coins"></span></span>`;
}

function coinMarkup() {
  return `<span class="coin-symbol" aria-label="G&T coins"></span>`;
}

function productStock(product) {
  if (!product || product.status !== "listed") return 0;
  const quantity = Number(product.quantity);
  if (!Number.isFinite(quantity)) return 5;
  return Math.max(0, Math.floor(quantity));
}

function stockLabel(product) {
  const stock = productStock(product);
  if (stock < 1) return "Sold out";
  if (stock === 1) return "Only 1 left";
  return `${stock} left`;
}

function syncCartQuantitiesToStock() {
  let changed = false;
  state.cart = state.cart.filter(productId => {
    const product = products.find(item => item.id === productId);
    const stock = productStock(product);
    if (!product || stock < 1) {
      delete state.cartQuantities[productId];
      changed = true;
      return false;
    }
    const currentQty = Number(state.cartQuantities[productId] || 1);
    const nextQty = Math.max(1, Math.min(stock, Math.floor(currentQty) || 1));
    if (nextQty !== currentQty) changed = true;
    state.cartQuantities[productId] = nextQty;
    return true;
  });
  return changed;
}

function buildUpiPayUrl(amount) {
  const upi = platformConfig.integrations?.payments?.upi || {};
  const params = new URLSearchParams({
    pa: upi.upiId || "",
    pn: upi.merchantName || "GIVE & TAKE",
    am: String(amount || ""),
    cu: "INR",
    tn: `GIVE & TAKE coin recharge ${amount || ""}`.trim()
  });
  return `upi://pay?${params.toString()}`;
}

async function getConfiguredUpi() {
  let upi = platformConfig.integrations?.payments?.upi || {};
  if (upi.upiId) return upi;
  try {
    const configData = await api("/api/config");
    platformConfig = configData;
    upi = platformConfig.integrations?.payments?.upi || {};
  } catch (error) {
    console.warn("Could not refresh payment config:", error.message);
  }
  return upi;
}

function getProductImages(product) {
  return [...new Set([
    product.imageUrl,
    ...(Array.isArray(product.images) ? product.images : [])
  ].filter(Boolean))];
}

async function loadProductDetail(productId) {
  if (!productId || productDetails.has(productId)) return productDetails.get(productId);
  if (productDetailRequests.has(productId)) return productDetailRequests.get(productId);
  const existing = products.find(product => product.id === productId);
  const request = api(`/api/products/${encodeURIComponent(productId)}`)
    .then(data => {
      if (!data.product) return existing;
      const recoveredProduct = applyRecoveredPrice(data.product);
      productDetails.set(productId, recoveredProduct);
      products = products.map(product => product.id === productId ? { ...product, ...recoveredProduct } : product);
      return recoveredProduct;
    })
    .catch(error => {
      if (existing) {
        productDetails.set(productId, existing);
        return existing;
      }
      throw error;
    })
    .finally(() => productDetailRequests.delete(productId));
  productDetailRequests.set(productId, request);
  return request;
}

function preloadProductDetail(productId) {
  if (!productId || productDetails.has(productId) || productDetailRequests.has(productId)) return;
  loadProductDetail(productId).catch(() => {});
}

function preloadProductImage(productId) {
  const product = productDetails.get(productId) || products.find(item => item.id === productId);
  const [imageUrl] = getProductImages(product || {});
  if (!imageUrl) return;
  const image = new Image();
  image.src = optimizedImageUrl(imageUrl, 600);
}

function optimizedImageUrl(imageUrl, width = 600) {
  if (!imageUrl || !imageUrl.includes("deodap.in/cdn/shop/")) return imageUrl;
  const cleanUrl = imageUrl.replace(/([?&])width=\d+&?/g, "$1").replace(/[?&]$/, "");
  return `${cleanUrl}${cleanUrl.includes("?") ? "&" : "?"}width=${width}`;
}

function productVisual(product, className = "product-visual") {
  const fallbackStyle = `--art-a:${safeCssColor(product.artA, "#f5f7f2")};--art-b:${safeCssColor(product.artB, "#e4efe8")}`;
  const [imageUrl] = getProductImages(product);
  const imageWidth = className.includes("cart") || className.includes("order") ? 220 : 600;
  const displayImageUrl = imageUrl ? safeImageUrl(optimizedImageUrl(imageUrl, imageWidth)) : "";
  const isDetailImage = className.includes("detail");
  if (displayImageUrl) {
    return `
      <div class="${className}" style="${fallbackStyle}">
        <img class="product-photo" src="${escapeHtml(displayImageUrl)}" alt="${escapeHtml(product.title)}" loading="${isDetailImage ? "eager" : "lazy"}" decoding="async" ${isDetailImage ? 'fetchpriority="high"' : ""} />
      </div>
    `;
  }
  return `<div class="${className}" style="${fallbackStyle}"></div>`;
}

function hydrateDetailGallery() {
  const thumbnails = [...document.querySelectorAll("[data-gallery-thumb-src]")];
  thumbnails.forEach((image, index) => {
    window.setTimeout(() => {
      image.src = image.dataset.galleryThumbSrc;
      image.removeAttribute("data-gallery-thumb-src");
    }, index * 70);
  });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function safeUrl(value, options = {}) {
  const rawUrl = String(value || "").trim();
  if (!rawUrl) return "";
  if (options.allowUpi && /^upi:\/\/pay\?/i.test(rawUrl)) return rawUrl;
  if (options.allowDataImages && /^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z0-9+/=]+$/i.test(rawUrl)) return rawUrl;
  try {
    const parsed = new URL(rawUrl, window.location.origin);
    if (["http:", "https:"].includes(parsed.protocol)) return parsed.href;
  } catch {
    return "";
  }
  return "";
}

function safeImageUrl(value) {
  return safeUrl(value, { allowDataImages: true });
}

function escapeSafeUrl(value, options = {}) {
  return escapeHtml(safeUrl(value, options));
}

function escapeSafeImageUrl(value) {
  return escapeHtml(safeImageUrl(value));
}

function safeCssColor(value, fallback) {
  const color = String(value || "").trim();
  if (/^#[0-9a-f]{3,8}$/i.test(color)) return color;
  if (/^rgba?\([\d\s.,%]+\)$/i.test(color)) return color;
  if (/^hsla?\([\d\s.,%]+\)$/i.test(color)) return color;
  return fallback;
}

function isMaintenanceActive() {
  return Boolean(platformConfig.maintenance?.full);
}

function compactProductTitle(title, maxLength = 52) {
  const cleanTitle = String(title || "").replace(/\s+/g, " ").trim();
  if (cleanTitle.length <= maxLength) return cleanTitle;
  return `${cleanTitle.slice(0, maxLength).trim()}...`;
}

function displayCategoryName(categoryId) {
  const displayId = categoryId === "mobiles" ? "electronics" : categoryId;
  return categories.find(category => category.id === displayId)?.name || "Product";
}

function getDeliveryCharge(productTotal) {
  return productTotal > DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_CHARGE;
}

function formatDeliveryCharge(productTotal) {
  const charge = getDeliveryCharge(productTotal);
  return charge === 0 ? "Free delivery" : `Rs.${charge} delivery fee - pay on delivery`;
}

let toastTimer = null;

function showToast(message) {
  let toast = document.getElementById("appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "app-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1700);
}

function animateCartBadge() {
  const cartNavLink = document.getElementById("cartNavLink");
  if (!cartNavLink) return;
  cartNavLink.classList.remove("cart-bounce");
  requestAnimationFrame(() => {
    cartNavLink.classList.add("cart-bounce");
    setTimeout(() => cartNavLink.classList.remove("cart-bounce"), 520);
  });
}

function addProductToCart(productId) {
  const product = products.find(item => item.id === productId) || productDetails.get(productId);
  const stock = productStock(product);
  if (stock < 1) {
    showToast("This item is sold out");
    return;
  }
  if (!state.cart.includes(productId)) {
    state.cart.push(productId);
    state.cartQuantities[productId] = 1;
  } else {
    const nextQty = Math.min(Number(state.cartQuantities[productId] || 1) + 1, stock);
    if (nextQty === Number(state.cartQuantities[productId] || 1)) {
      showToast(`Only ${stock} available`);
      return;
    }
    state.cartQuantities[productId] = nextQty;
  }
  state.checkoutStep = "cart";
  saveCartState();
  renderAuthStatus();
  if (state.route === "cart") renderCart();
  animateCartBadge();
  showToast("Item added to cart");
}

function productShareUrl(productId) {
  const baseUrl = location.origin && location.origin !== "null"
    ? `${location.origin}${location.pathname}`
    : "https://give-take-beckend.onrender.com/";
  return `${baseUrl}#product/${encodeURIComponent(productId)}`;
}

async function shareProduct(productId) {
  const product = productDetails.get(productId) || products.find(item => item.id === productId);
  if (!product) {
    showToast("Product not ready to share");
    return;
  }
  const url = productShareUrl(product.id);
  const text = `${product.title} - ${formatCoins(product.price)} on GIVE & TAKE`;
  if (navigator.share) {
    try {
      await navigator.share({ title: product.title, text, url });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank", "noopener");
}

function updateProductPageShare(productId = "") {
  const button = document.getElementById("productPageShare");
  if (!button) return;
  if (!productId) {
    button.hidden = true;
    button.disabled = true;
    button.dataset.shareProduct = "";
    return;
  }
  button.hidden = false;
  button.disabled = false;
  button.dataset.shareProduct = productId;
}

function card(product) {
  const stock = productStock(product);
  return `
    <article class="product-card">
      <button class="product-card-visual-button" data-product="${escapeHtml(product.id)}" type="button" aria-label="View ${escapeHtml(product.title)} details">
        ${productVisual(product)}
      </button>
      <div class="product-body">
        <div class="badges">
          <span class="badge">${escapeHtml(product.source)}</span>
        </div>
        <h3 title="${escapeHtml(product.title)}">${escapeHtml(compactProductTitle(product.title))}</h3>
        <div class="coin-price">${formatCoins(product.price)}</div>
        <p>${escapeHtml(displayCategoryName(product.category))} • ${escapeHtml(stockLabel(product))}</p>
        <div class="card-actions">
          <button class="primary-button" data-add="${escapeHtml(product.id)}" type="button" ${stock < 1 ? "disabled" : ""}>${stock < 1 ? "Sold Out" : "Add to Cart"}</button>
        </div>
      </div>
    </article>
  `;
}

function loadingPanel(message = "Loading latest prices...") {
  return `
    <article class="loading-panel" aria-live="polite" aria-label="${escapeHtml(message)}">
      <span class="loading-skeleton loading-skeleton-image" aria-hidden="true"></span>
      <span class="loading-skeleton loading-skeleton-line wide" aria-hidden="true"></span>
      <span class="loading-skeleton loading-skeleton-line" aria-hidden="true"></span>
      <span class="loading-skeleton loading-skeleton-pill" aria-hidden="true"></span>
    </article>
  `;
}

function renderCategories() {
  const homeCategories = homeCategoryIds
    .map(id => categories.find(category => category.id === id))
    .filter(Boolean);
  els.categoryGrid.innerHTML = homeCategories.map(category => `
    <article class="category-card${isPausedShoppingCategory(category.id) ? " category-card-paused" : ""}" data-category="${escapeHtml(category.id)}">
      <div class="category-icon" aria-hidden="true">${categoryIcons[category.id] || categoryIcons.default}</div>
      <div>
        <h3>${escapeHtml(category.name)}</h3>
        ${isPausedShoppingCategory(category.id) ? '<span class="category-coming-soon">Coming soon</span>' : ""}
      </div>
    </article>
  `).join("");
}

function renderSelectors() {
  const selectableCategories = categories.filter(category => category.id !== "mobiles");
  const sellableCategories = selectableCategories.filter(category => !isCustomerSellBlockedCategory(category));
  els.categoryFilter.innerHTML = `<option value="all">All categories</option>` + selectableCategories.map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)}</option>`).join("");
  els.sellCategory.innerHTML = sellableCategories.map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)}</option>`).join("");
}

function isCustomerSellBlockedCategory(category) {
  const id = String(category?.id || category || "").trim().toLowerCase();
  const name = String(category?.name || "").trim().toLowerCase();
  return customerSellBlockedCategoryIds.has(id) || /fashion|clothes|shoes/.test(name);
}

function isPausedShoppingCategory(category) {
  const id = String(category?.id || category || "").trim().toLowerCase();
  return pausedShoppingCategoryIds.has(id);
}

function comingSoonPanel() {
  return `
    <article class="category-coming-soon-panel" aria-live="polite">
      <div class="category-coming-soon-icon" aria-hidden="true">${categoryIcons.fashion}</div>
      <p class="kicker">Coming Soon</p>
      <h2>Good style is coming. Trusted quality comes first.</h2>
      <p>We’re carefully selecting clothes and shoes that meet our quality standards—because your trust matters more than filling a shelf.</p>
      <button class="secondary-button" data-route="market" type="button">Explore other products</button>
    </article>
  `;
}

function getFilteredProducts() {
  const category = els.categoryFilter?.value || "all";
  const city = els.cityFilter?.value || "all";
  const sort = els.sortFilter?.value || "trending";
  const query = state.query.toLowerCase();
  let list = [...products].filter(product => {
    if (isPausedShoppingCategory(product.category)) return false;
    const matchesCategory = category === "all"
      || product.category === category
      || (category === "electronics" && product.category === "mobiles");
    const matchesCity = city === "all" || SERVICE_CITIES_TEXT.includes(city);
    const matchesQuery = !query || `${product.title} ${SERVICE_CITIES_TEXT} ${product.source}`.toLowerCase().includes(query);
    return matchesCategory && matchesCity && matchesQuery;
  });

  const sorters = {
    trending: (a, b) => (b.views + b.sold * 12) - (a.views + a.sold * 12),
    newest: (a, b) => b.newest - a.newest,
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    views: (a, b) => b.views - a.views,
    purchased: (a, b) => b.sold - a.sold,
  };
  return list.sort(sorters[sort]);
}

function renderProducts() {
  if (!backendDataReady) {
    const loading = loadingPanel("Loading latest prices...");
    els.featuredProducts.innerHTML = loading;
    els.productGrid.innerHTML = loading;
    if (state.category) {
      const category = categories.find(item => item.id === state.category);
      els.categoryTitle.textContent = category?.name || "Category";
      els.categoryProducts.innerHTML = isPausedShoppingCategory(state.category)
        ? comingSoonPanel()
        : loading;
    }
    return;
  }
  const availableProducts = products.filter(product => !isPausedShoppingCategory(product.category));
  els.featuredProducts.innerHTML = availableProducts.map(card).join("");
  els.productGrid.innerHTML = getFilteredProducts().map(card).join("");
  if (state.category) {
    const category = categories.find(item => item.id === state.category);
    const categoryProducts = products.filter(product => product.category === state.category || (state.category === "electronics" && product.category === "mobiles"));
    els.categoryTitle.textContent = category?.name || "Category";
    els.categoryProducts.innerHTML = isPausedShoppingCategory(state.category)
      ? comingSoonPanel()
      : categoryProducts.length
      ? categoryProducts.map(card).join("")
      : loadingPanel("No products available in this category yet.");
  }
}

function renderProductDetail() {
  if (!state.productId) {
    updateProductPageShare();
    els.productDetail.innerHTML = loadingPanel("Select a product to view details.");
    return;
  }
  if (!backendDataReady) {
    updateProductPageShare();
    els.productDetail.innerHTML = loadingPanel("Loading latest product price...");
    return;
  }
  const orderProduct = orders
    .flatMap(order => order.products || [])
    .find(item => (item.productId || item.id) === state.productId);
  const detailProduct = productDetails.get(state.productId);
  const listProduct = products.find(item => item.id === state.productId);
  if (!detailProduct && !orderProduct && !listProduct && (!backendDataReady || productDetailRequests.has(state.productId))) {
    updateProductPageShare();
    els.productDetail.innerHTML = loadingPanel("Loading latest product price...");
    return;
  }
  const product = detailProduct || orderProduct || listProduct;
  if (!product) {
    updateProductPageShare();
    els.productDetail.innerHTML = loadingPanel("Product not found.");
    return;
  }
  if (isPausedShoppingCategory(product.category)) {
    updateProductPageShare();
    els.productDetail.innerHTML = comingSoonPanel();
    return;
  }
  updateProductPageShare(product.id);
  const hiddenChecks = new Set(["Original price listed", "Admin price editable", "Product matched from supplied screenshot", "4+ DeoDap product photos linked", "4+ DODAP product photos linked"]);
  const visibleChecks = (product.checks || []).filter(check => !hiddenChecks.has(check));
  const allowedDetailBadges = (product.badges || []).filter(badge => /verified|new/i.test(badge));
  const galleryImages = getProductImages(product);
  const stock = productStock(product);
  els.productDetail.innerHTML = `
    <div class="detail-gallery">
      ${productVisual(product, "detail-image")}
      ${galleryImages.length > 1 ? `
        <div class="detail-thumbnails" aria-label="Product photos">
          ${galleryImages.map((image, index) => {
            const galleryImage = safeImageUrl(optimizedImageUrl(image, 600));
            const galleryThumb = safeImageUrl(optimizedImageUrl(image, 160));
            if (!galleryImage || !galleryThumb) return "";
            return `
            <button class="${index === 0 ? "is-active" : ""}" data-gallery-image="${escapeHtml(galleryImage)}" type="button" aria-label="Show product photo ${index + 1}">
              <img ${index < 2 ? `src="${escapeHtml(galleryThumb)}"` : `data-gallery-thumb-src="${escapeHtml(galleryThumb)}"`} alt="${escapeHtml(product.title)} photo ${index + 1}" loading="lazy" decoding="async" />
            </button>
          `}).join("")}
        </div>
      ` : ""}
    </div>
    <article class="detail-panel">
      <div class="badges">
        <span class="badge">${escapeHtml(product.source)}</span>
        <span class="badge">${escapeHtml(product.condition)}</span>
        ${allowedDetailBadges.map(badge => `<span class="badge">${escapeHtml(badge)}</span>`).join("")}
      </div>
      <h1>${escapeHtml(product.title)}</h1>
      <div class="coin-price">${formatCoins(product.price)}</div>
      <p>Product price is coin-only. Any delivery fee is shown separately and paid on delivery.</p>
      <p><strong>${escapeHtml(stockLabel(product))}</strong></p>
      <div class="checklist">
        ${visibleChecks.map(check => `<span>${escapeHtml(check)}</span>`).join("")}
      </div>
      <div class="detail-actions">
        <button class="primary-button" data-buy-now="${escapeHtml(product.id)}" type="button" ${stock < 1 ? "disabled" : ""}>${stock < 1 ? "Sold Out" : "Buy with Coins"}</button>
        <button class="secondary-button" data-add-stay="${escapeHtml(product.id)}" type="button" ${stock < 1 ? "disabled" : ""}>Add to Cart</button>
      </div>
    </article>
  `;
  hydrateDetailGallery();
}

function renderFormFields() {
  if (isCustomerSellBlockedCategory(els.sellCategory.value)) {
    els.dynamicFields.innerHTML = "";
    return;
  }
  const category = els.sellCategory.value;
  const fieldMap = {
    mobiles: ["Brand and model", "Storage/RAM", "IMEI available?", "Bill/warranty", "Battery/display issues"],
    electronics: ["Brand/model/serial", "Power and charging status", "Accessories included", "Known defects"],
    books: ["Class/course/subject", "Edition/year", "Pages missing?", "Writing/highlighting condition"],
    home: ["Brand if any", "Working condition", "Missing parts", "Hygiene/safety condition"],
    bags: ["Size/type", "Zip/handle condition", "Tears or stains", "Brand if any"],
    toys: ["Age group", "Set completeness", "Missing pieces", "Cleanliness"],
  };
  els.dynamicFields.innerHTML = (fieldMap[category] || []).map(field => `
    <label>${field}<input placeholder="${field}" /></label>
  `).join("");
}

function fileToCompressedDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSide = 900;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      image.onerror = () => reject(new Error("Could not read one selected photo"));
      image.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Could not read one selected photo"));
    reader.readAsDataURL(file);
  });
}

function validateProductImageUrl(imageUrl) {
  const value = String(imageUrl || "").trim();
  if (!value) return Promise.resolve();
  let parsedUrl;
  try {
    parsedUrl = new URL(value);
  } catch {
    return Promise.reject(new Error("Enter a valid direct image URL, or upload the image file."));
  }
  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return Promise.reject(new Error("Image URL must start with http:// or https://."));
  }
  return new Promise((resolve, reject) => {
    const image = new Image();
    const timer = window.setTimeout(() => {
      image.src = "";
      reject(new Error("Image link did not load. Use Copy Image Address or upload the image file."));
    }, 8000);
    image.onload = () => {
      window.clearTimeout(timer);
      resolve();
    };
    image.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("This is not a direct image link. Use Copy Image Address or upload the image file."));
    };
    image.src = value;
  });
}

async function collectSellPhotos(fileList) {
  const files = [...(fileList || state.sellPhotoFiles || [])].filter(file => file.type.startsWith("image/"));
  if (files.length < 4 || files.length > 5) {
    throw new Error("Please upload 4 to 5 product photos before submitting.");
  }
  return Promise.all(files.map(fileToCompressedDataUrl));
}

function sellPhotoKey(file) {
  return [file.name, file.size, file.lastModified].join(":");
}

function updateSellPhotoStatus(message = "", isError = false) {
  const photoError = document.getElementById("sellPhotoError");
  if (!photoError) return;
  const count = state.sellPhotoFiles.length;
  photoError.hidden = false;
  photoError.textContent = message || `${count}/5 photos selected. ${count < 4 ? `Add ${4 - count} more.` : "Ready to submit."}`;
  photoError.classList.toggle("is-info", !isError);
  if (!count && !message) photoError.hidden = true;
}

function addSellPhotoFiles(fileList) {
  const incoming = [...(fileList || [])].filter(file => file.type.startsWith("image/"));
  if (!incoming.length) {
    updateSellPhotoStatus("Please select image files only.", true);
    return;
  }
  const existingKeys = new Set(state.sellPhotoFiles.map(sellPhotoKey));
  const remainingSlots = Math.max(0, 5 - state.sellPhotoFiles.length);
  const nextFiles = incoming
    .filter(file => !existingKeys.has(sellPhotoKey(file)))
    .slice(0, remainingSlots);
  state.sellPhotoFiles.push(...nextFiles);
  if (incoming.length > nextFiles.length && state.sellPhotoFiles.length >= 5) {
    updateSellPhotoStatus("Maximum 5 product photos allowed.", true);
    return;
  }
  updateSellPhotoStatus();
}

function clearSellPhotoFiles(form) {
  state.sellPhotoFiles = [];
  if (form?.elements?.photos) form.elements.photos.value = "";
  updateSellPhotoStatus();
}

function renderWallet() {
  const upi = platformConfig.integrations?.payments?.upi || {};
  const walletIsLoading = customerToken && !customerDataReady;
  document.getElementById("walletUpiNotice")?.remove();
  if (state.rechargeAmount) {
    els.rechargeGrid.classList.add("payment-step");
    els.rechargeGrid.innerHTML = `
      <div class="payment-summary">
        <span>Selected amount</span>
        <strong>${formatCoins(state.rechargeAmount)}</strong>
        <small>Equivalent to ₹${new Intl.NumberFormat("en-IN").format(state.rechargeAmount)}</small>
      </div>
      <div class="upi-payment-box">
        <span>Pay using any UPI app</span>
        <div class="upi-id-row">
          <strong>${upi.upiId ? escapeHtml(upi.upiId) : "UPI ID not configured"}</strong>
          ${upi.upiId ? `<button class="upi-copy-button" data-copy-upi="${escapeHtml(upi.upiId)}" type="button">Copy</button>` : ""}
        </div>
        <small>After payment, enter your UPI transaction/reference ID below.</small>
        <a class="primary-button upi-open-button" href="${escapeSafeUrl(buildUpiPayUrl(state.rechargeAmount), { allowUpi: true })}">Open UPI App</a>
      </div>
      <form class="upi-reference-form" id="upiReferenceForm">
        <input name="upiReference" placeholder="Enter UPI transaction/reference ID" required />
        <button class="primary-button add-coins-submit-button" type="submit">Submit Add Coins Request</button>
        <button class="secondary-button add-coins-change-button" data-cancel-recharge type="button">Change Amount</button>
      </form>
    `;
  } else {
    els.rechargeGrid.classList.remove("payment-step");
    const rechargeButtons = [50, 100, 150, 200, 250, 500, 1000, 2000, 5000].map(amount => `
      <button type="button" data-recharge="${amount}">${formatCoins(amount)}</button>
    `).join("");
    els.rechargeGrid.innerHTML = `
      ${rechargeButtons}
      <form class="custom-recharge-form" id="customRechargeForm" novalidate>
        <input name="customRechargeAmount" type="number" min="50" step="50" inputmode="numeric" placeholder="Enter custom amount" required />
        <button class="secondary-button" data-custom-recharge-submit type="submit" disabled>Add Coins</button>
        <small data-custom-recharge-hint>Enter amount in multiples of 50</small>
      </form>
    `;
  }
  els.walletBalance.textContent = walletIsLoading ? "..." : new Intl.NumberFormat("en-IN").format(wallet.balance || 0);
  const walletPageBalance = document.getElementById("walletPageBalance");
  if (walletPageBalance) walletPageBalance.innerHTML = `<span class="coin-amount">${new Intl.NumberFormat("en-IN").format(wallet.balance || 0)} <span class="coin-symbol" aria-label="G&T coin"></span></span>`;
  const walletEmptyNote = document.getElementById("walletEmptyNote");
  if (walletEmptyNote) walletEmptyNote.hidden = Number(wallet.balance || 0) > 0;
  const ledger = wallet.ledger || [];
  els.ledgerList.innerHTML = ledger.map(entry => {
    const sign = entry.type === "debit" ? "-" : "+";
    return `<div class="ledger-item"><strong>${sign}${new Intl.NumberFormat("en-IN").format(entry.amount)}</strong><span>${escapeHtml(entry.reason)}</span></div>`;
  }).join("") || `<div class="ledger-item ledger-empty"><strong>No coin transactions yet.</strong><span>No transactions yet. Add coins to get started.</span></div>`;
}

function renderOrders() {
  const list = orders || [];
  const getOrderStatus = order => String(order.status || "new-order").toLowerCase();
  const isCancelled = order => getOrderStatus(order) === "cancelled";
  const isCompleted = order => ["delivered", "completed"].includes(getOrderStatus(order));
  const isActive = order => !isCancelled(order) && !isCompleted(order);
  const activeOrders = list.filter(isActive).length;
  const completedOrders = list.filter(isCompleted).length;
  const cancelledOrders = list.filter(isCancelled).length;
  const filteredList = state.orderFilter === "active"
    ? list.filter(isActive)
    : state.orderFilter === "completed"
      ? list.filter(isCompleted)
      : state.orderFilter === "cancelled"
        ? list.filter(isCancelled)
        : list;
  const summary = document.querySelector("#page-orders .orders-summary");
  if (summary) summary.textContent = `${list.length} Orders • ${activeOrders} Active • ${completedOrders} Completed`;
  if (!list.length) {
    const recommended = products
      .filter(product => product.status === "listed")
      .slice(0, 4);
    const cards = (recommended.length ? recommended : fallbackProducts.slice(0, 4)).map(product => `
      <article class="empty-cart-product">
        <button class="empty-cart-product-link" data-product="${escapeHtml(product.id)}" type="button" aria-label="View ${escapeHtml(product.title || "recommended item")}">
          ${productVisual(product, "empty-cart-product-image")}
          <span>
            <strong>${escapeHtml(product.title || "Recommended item")}</strong>
            <em>${formatCoins(product.price || 0)}</em>
          </span>
        </button>
        <button class="secondary-button" data-add="${escapeHtml(product.id)}" type="button">Add</button>
      </article>
    `).join("");
    els.ordersGrid.innerHTML = `
      <section class="empty-orders">
        <div class="empty-orders-card">
          <div class="empty-orders-icon" aria-hidden="true">
            <svg viewBox="0 0 96 96" role="img">
              <path d="M22 34 48 20l26 14v28L48 76 22 62V34Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>
              <path d="m22 34 26 14 26-14M48 48v28" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
              <path d="M36 27 62 41" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".35"/>
            </svg>
          </div>
          <h2>No orders yet</h2>
          <p>When you buy items using G&T Coins, your orders will appear here.</p>
          <a class="primary-button" href="#market">Browse Products</a>
        </div>
        <div class="orders-info-grid">
          <article><strong>Track your purchases</strong><span>Follow every order from placed to delivered.</span></article>
          <article><strong>View delivery status</strong><span>See packing, dispatch, and delivery updates.</span></article>
          <article><strong>Manage order history</strong><span>Keep your G&T Coin purchases in one place.</span></article>
        </div>
        <section class="cart-recommendations" aria-label="Start exploring">
          <div class="cart-recommendations-head">
            <h2>Start exploring</h2>
          </div>
          <div class="empty-cart-products">
            ${cards}
          </div>
        </section>
      </section>
    `;
    return;
  }
  els.ordersGrid.innerHTML = `
    <section class="orders-shell">
      ${state.orderSuccessNotice ? `
        <article class="order-success-card">
          <strong>Order placed successfully! Your order has been confirmed. You can track it from My Orders.</strong>
          ${state.orderSuccessNotice.warning ? `<span>${escapeHtml(state.orderSuccessNotice.warning)}</span>` : ""}
          <a class="primary-button" href="#orders">View My Orders</a>
        </article>
      ` : ""}
      <div class="orders-tabs">
        <button class="${state.orderFilter === "all" ? "active" : ""}" data-order-filter="all" type="button">All Orders (${list.length})</button>
        <button class="${state.orderFilter === "active" ? "active" : ""}" data-order-filter="active" type="button">Active (${activeOrders})</button>
        <button class="${state.orderFilter === "completed" ? "active" : ""}" data-order-filter="completed" type="button">Completed (${completedOrders})</button>
        <button class="${state.orderFilter === "cancelled" ? "active" : ""}" data-order-filter="cancelled" type="button">Cancelled (${cancelledOrders})</button>
      </div>
      ${filteredList.length ? filteredList.map(order => {
        const details = order.deliveryDetails || {};
        const orderedProductIds = Array.isArray(order.productIds) ? order.productIds : [];
        const sourceItems = Array.isArray(order.products) ? order.products : [];
        const itemCounts = orderedProductIds.length
          ? orderedProductIds.reduce((map, productId) => map.set(productId, (map.get(productId) || 0) + 1), new Map())
          : sourceItems.reduce((map, item) => map.set(item.id, (map.get(item.id) || 0) + 1), new Map());
        const groupedItems = [...itemCounts.entries()].map(([productId, qty]) => {
          const orderProduct = sourceItems.find(item => (item.productId || item.id) === productId);
          const catalogProduct = products.find(item => item.id === productId);
          const product = {
            ...(catalogProduct || {}),
            ...(orderProduct || {}),
          };
          if (!product.id) product.id = productId;
          if (!product.title) product.title = "Product title";
          if (!product.imageUrl && catalogProduct?.imageUrl) product.imageUrl = catalogProduct.imageUrl;
          if ((!Array.isArray(product.images) || !product.images.length) && Array.isArray(catalogProduct?.images)) {
            product.images = catalogProduct.images;
          }
          const unitPrice = Number(product.price || 0);
          return {
            ...product,
            productId,
            artA: product.artA || "#d3f4e9",
            artB: product.artB || "#3a6e63",
            qty,
            unitPrice,
            lineTotal: unitPrice * qty,
          };
        });
        const firstItem = groupedItems[0] || { artA: "#d3f4e9", artB: "#3a6e63", title: "Product title", qty: 1, unitPrice: order.totalCoins || 0, lineTotal: order.totalCoins || 0 };
        const displayItems = groupedItems.length ? groupedItems : [firstItem];
        const totalItemCount = groupedItems.reduce((sum, item) => sum + item.qty, 0) || orderedProductIds.length || 1;
        const deliveryChargeAmount = Number(order.deliveryCharge || 0);
        const deliveryChargeText = deliveryChargeAmount ? `Rs.${deliveryChargeAmount}` : "Free";
        const isExpanded = state.expandedOrderId === order.id;
        const rawStatus = getOrderStatus(order);
        const statusText = rawStatus.replaceAll("-", " ");
        const placedDate = order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Recently";
        const progressIndexMap = {
          "new-order": 0,
          "order-placed": 0,
          confirmed: 1,
          packed: 1,
          shipped: 2,
          "out-for-delivery": 2,
          delivered: 3,
          completed: 3,
        };
        const progressIndex = progressIndexMap[rawStatus] ?? 0;
        const badgeType = isCancelled(order) ? "cancelled" : isCompleted(order) ? "completed" : "";
        const badgeText = isCancelled(order) ? "CANCELLED" : isCompleted(order) ? "COMPLETED" : "ACTIVE";
        return `
          <article class="order-detail-card">
            <div class="order-detail-top">
              <div>
                <strong>Order ID: ${escapeHtml(order.id)}</strong>
                <span>Placed on: ${escapeHtml(placedDate)}</span>
              </div>
              <div class="order-total-box">
                <span>Total Amount</span>
                <strong>${formatCoins(order.totalCoins || 0)}</strong>
                <small>${deliveryChargeAmount ? "Delivery fee - Pay on delivery" : "Coins"}</small>
              </div>
            </div>
            <section class="order-status-panel">
              <div class="order-status-copy">
                <span class="order-status-icon">▧</span>
                <div>
                  <strong>${escapeHtml(statusText.charAt(0).toUpperCase() + statusText.slice(1))}</strong>
                  <span>${statusText === "order placed" ? "Seller will confirm your order soon" : "Your order is being processed"}</span>
                </div>
                <em class="${badgeType}">${badgeText}</em>
              </div>
              <div class="order-progress">
                ${["Order Placed", "Confirmed", "Shipped", "Delivered"].map((step, index) => `
                  <div class="${!isCancelled(order) && index <= progressIndex ? "done" : ""}">
                    <span>${!isCancelled(order) && index <= progressIndex ? "✓" : index + 1}</span>
                    <strong>${step}</strong>
                  </div>
                `).join("")}
              </div>
            </section>
            <section class="order-detail-section">
              <h3>Delivery Details</h3>
              ${isCancelled(order) && order.cancellationReason ? `<p class="order-cancel-reason"><span>Cancellation Reason</span><strong>${escapeHtml(order.cancellationReason)}</strong></p>` : ""}
              ${deliveryChargeAmount ? `<p><span>Delivery Fee</span><strong>Pay on Delivery</strong></p>` : ""}
              <p><span>Delivery Charge</span><strong>${deliveryChargeText}</strong></p>
              <p><span>Deliver to</span><strong>${escapeHtml(details.name || "Customer")} • ${escapeHtml(details.city || order.deliveryCity || "City")}</strong></p>
            </section>
            <section class="order-detail-section order-summary-section">
              <h3>Order Summary</h3>
              <div class="order-summary-strip">
                <p><span>Order ID</span><strong>#${escapeHtml(order.id)}</strong></p>
                <p><span>Total Items</span><strong>${totalItemCount} ${totalItemCount === 1 ? "Item" : "Items"}</strong></p>
                <p><span>Order Total</span><strong>${formatCoins(order.totalCoins || 0)}</strong></p>
                <p><span>Order Date</span><strong>${escapeHtml(placedDate)}</strong></p>
              </div>
            </section>
            <section class="order-detail-section order-items-section">
              <div class="order-section-title">
                <h3>Order Items (${totalItemCount})</h3>
                <strong>Total: ${formatCoins(order.totalCoins || 0)}</strong>
              </div>
              <div class="order-items-list">
                ${displayItems.map(item => `
                  <button class="order-item-row order-item-link" data-order-item-key="${escapeHtml(`${order.id}:${item.productId || item.id || "item"}`)}" data-product="${escapeHtml(item.productId || item.id || "")}" type="button">
                    ${productVisual(item, "order-item-image")}
                    <div>
                      <strong>${escapeHtml(item.title || "Product title")}</strong>
                      <span>Quantity: ${item.qty} <b>×</b> ${formatCoins(item.unitPrice)}</span>
                    </div>
                  </button>
                `).join("")}
              </div>
            </section>
            ${isExpanded ? `
              <section class="order-detail-section order-expanded-details">
                <h3>Full Order Details</h3>
                <div class="order-summary-grid">
                  <p><span>Total items</span><strong>${totalItemCount}</strong></p>
                  <p><span>Total coins used</span><strong>${formatCoins(order.totalCoins || 0)}</strong></p>
                  <p><span>Delivery charge</span><strong>${deliveryChargeText}</strong></p>
                  <p><span>Order status</span><strong>${escapeHtml(statusText)}</strong></p>
                  <p><span>Order date/time</span><strong>${escapeHtml(placedDate)}</strong></p>
                  <p><span>Delivery address</span><strong>${escapeHtml([details.name, details.address, details.city, details.pincode, details.landmark ? `Near ${details.landmark}` : ""].filter(Boolean).join(" • ") || "Address not available")}</strong></p>
                </div>
              </section>
            ` : ""}
            <div class="order-detail-footer">
              <span>Need Help? <a href="#support">Contact Support</a></span>
              <button class="secondary-button" data-order-details="${escapeHtml(order.id)}" type="button">${isExpanded ? "Hide Order Details" : "View Order Details"}</button>
            </div>
          </article>
        `;
      }).join("") : `<div class="orders-filter-empty">No ${escapeHtml(state.orderFilter)} orders yet.</div>`}
    </section>
  `;
}

function renderAccount() {
  if (!els.accountGrid) return;
  if (!currentUser) {
    els.accountGrid.innerHTML = `
      <article><h3>Account</h3><p>Please login to view account details.</p><a class="primary-button" href="#auth">Login</a></article>
    `;
    return;
  }
  const latestOrders = orders.slice(0, 3);
  const latestSellRequests = sellRequests.slice(0, 3);
  const displayName = currentUser.name || sellRequests.find(request => request.sellerName)?.sellerName || "User";
  const email = currentUser.email || "";
  const address = currentUser.addressBook || {};
  const avatarLetter = (displayName !== "User" ? displayName : email || "U").trim().charAt(0).toUpperCase() || "U";
  const balance = Number(wallet.balance || 0);
  const balanceText = customerToken && !customerDataReady ? "..." : new Intl.NumberFormat("en-IN").format(balance);
  const sellRequestCount = sellRequests.length;
  const activeOrdersCount = orders.filter(order => !["delivered", "cancelled", "completed"].includes(String(order.status || "").toLowerCase())).length;
  const formatAccountDate = value => {
    const date = value ? new Date(value) : null;
    return date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : "Recent";
  };
  const getAccountStatusClass = status => {
    const cleanStatus = String(status || "").toLowerCase();
    if (["pickup-scheduled", "delivered", "accepted"].includes(cleanStatus)) return "success";
    if (["rejected", "cancelled"].includes(cleanStatus)) return "danger";
    if (["confirmed", "packed", "out-for-delivery", "approved"].includes(cleanStatus)) return "info";
    return "warning";
  };
  const renderSellRequestMessage = request => {
    const status = String(request.status || "upload-submitted");
    const readableStatus = status.replaceAll("-", " ");
    const pickupNote = request.pickupNote || "Pickup has been scheduled. GIVE & TAKE team will contact you soon for pickup timing and verification.";
    const rejectionReason = request.rejectionReason || request.reviewNote || "The item did not meet our acceptance requirements.";
    const statusNotes = {
      "upload-submitted": "Your item is waiting for admin review.",
      "under-review": "Admin is reviewing your item details.",
      "pickup-scheduled": pickupNote,
      rejected: `Your item was rejected because: ${rejectionReason}`,
      accepted: `${new Intl.NumberFormat("en-IN").format(request.finalCoins || request.expectedCoins || 0)} coins credited after final approval.`,
    };
    return `
      <article class="account-history-card">
        <div class="account-history-top">
          <div>
            <strong>${escapeHtml(request.title || "Item")}</strong>
            <small>${escapeHtml(formatAccountDate(request.createdAt))}</small>
          </div>
          <em class="account-status-badge ${getAccountStatusClass(status)}">${escapeHtml(readableStatus)}</em>
        </div>
        <p>${escapeHtml(statusNotes[status] || readableStatus)}</p>
      </article>
    `;
  };
  const renderOrderSummary = order => {
    const status = String(order.status || "new-order");
    const readableStatus = status.replaceAll("-", " ");
    return `
      <article class="account-history-card account-order-card" data-route="orders">
        <div class="account-history-top">
          <div>
            <strong>Order ${escapeHtml(order.id || "")}</strong>
            <small>${escapeHtml(formatAccountDate(order.createdAt))}</small>
          </div>
          <em class="account-status-badge ${getAccountStatusClass(status)}">${escapeHtml(readableStatus)}</em>
        </div>
        <div class="account-order-meta">
          <span>${formatCoins(order.totalCoins || 0)}</span>
          <b>View Details →</b>
        </div>
      </article>
    `;
  };
  const hasDefaultAddress = Boolean(address.name && address.phone && address.houseArea && address.city && address.pincode);
  const addressLocked = hasDefaultAddress && !state.addressBookEditing;
  const addressSummary = [
    address.houseArea,
    address.city,
    address.pincode,
    address.landmark ? `Near ${address.landmark}` : ""
  ].filter(Boolean).join(" • ");
  const addressHeader = `
    <div class="account-panel-head">
      <div class="account-panel-title">
        <span class="account-panel-icon">⌖</span>
        <div>
          <h3>Address Book</h3>
          <p>${escapeHtml(addressSummary || "Save your default pickup and delivery address.")}</p>
        </div>
      </div>
      ${hasDefaultAddress ? `
        <div class="address-actions">
          <span class="verified-badge address-default-badge">Default Address</span>
          <button class="secondary-button" data-edit-address type="button">${addressLocked ? "Edit Address" : "Cancel Edit"}</button>
        </div>
      ` : ""}
    </div>
    `;
  
  els.accountGrid.innerHTML = `
    <article class="account-profile-card">
      <div class="account-avatar">${escapeHtml(avatarLetter)}</div>
      <div class="account-profile-copy">
        <h2>${escapeHtml(displayName)}</h2>
        <p>${escapeHtml(email || "Email not available")}</p>
        <span class="verified-badge"><span class="badge-icon">✓</span> Verified Account</span>
      </div>
    </article>
    <section class="account-stats" aria-label="Account stats">
      <article>
        <span>Active Orders</span>
        <strong>${activeOrdersCount}</strong>
      </article>
      <article>
        <span>Sell Requests</span>
        <strong>${sellRequestCount}</strong>
      </article>
      <article>
        <span>Wallet Balance</span>
        <strong>${balanceText}</strong>
      </article>
    </section>
    <section class="account-quick-actions" aria-label="Quick actions">
      <a href="#sell"><span class="quick-icon">↗</span><strong>Sell Item</strong></a>
      <a href="#orders"><span class="quick-icon">▤</span><strong>My Orders</strong></a>
      <a href="#wallet"><span class="quick-icon coin-action-icon">G</span><strong>Wallet</strong></a>
      <a href="#support"><span class="quick-icon">?</span><strong>Support</strong></a>
    </section>
    <article class="account-wallet-card">
      <div>
        <span>Current Balance</span>
        <strong>${formatCoins(balance)}</strong>
      </div>
      <a class="primary-button" href="#wallet">Open Wallet</a>
    </article>
    <article class="wide-card account-panel"><h3>Recent Sell Requests</h3>
      <div class="account-list">
        ${latestSellRequests.map(renderSellRequestMessage).join("") || `<span class="account-empty-note">No sell requests yet.</span>`}
      </div>
      <a class="secondary-button" href="#sell">Sell an Item</a>
    </article>
    <article class="wide-card account-panel"><h3>Recent Orders</h3>
      <div class="account-list">
        ${latestOrders.map(renderOrderSummary).join("") || `<span class="account-empty-note">No orders yet.</span>`}
      </div>
      <a class="secondary-button" href="#market">Browse Products</a>
    </article>
    <article class="wide-card account-panel">
      ${addressHeader}
      <form class="address-book-form" id="addressBookForm">
        <label>Name <input name="name" value="${escapeHtml(address.name || currentUser.name || "")}" placeholder="Full name" required ${addressLocked ? "disabled" : ""} /></label>
        <label>Phone <input name="phone" value="${escapeHtml(address.phone || "")}" inputmode="tel" placeholder="Mobile number" required ${addressLocked ? "disabled" : ""} /></label>
        <label>House / Area <input name="houseArea" value="${escapeHtml(address.houseArea || "")}" placeholder="House no, street, area" required ${addressLocked ? "disabled" : ""} /></label>
        <label>City
          <select name="city" required ${addressLocked ? "disabled" : ""}>
            ${["Lucknow", "Ayodhya", "Gonda"].map(city => `<option ${address.city === city ? "selected" : ""}>${city}</option>`).join("")}
          </select>
        </label>
        <label>Pincode <input name="pincode" value="${escapeHtml(address.pincode || "")}" inputmode="numeric" placeholder="Pincode" required ${addressLocked ? "disabled" : ""} /></label>
        <label>Landmark <input name="landmark" value="${escapeHtml(address.landmark || "")}" placeholder="Nearby landmark" ${addressLocked ? "disabled" : ""} /></label>
        ${addressLocked ? "" : `<button class="primary-button" type="submit">${hasDefaultAddress ? "Update Address" : "Save Address"}</button>`}
      </form>
    </article>
    <div class="account-logout-row">
      <button class="logout-outline-button" data-logout type="button">Logout</button>
    </div>
  `;
}

function getCompactClientCatalog() {
  return products.slice(0, 300).map(product => ({
    id: product.id,
    title: product.title,
    category: product.category,
    price: product.price,
    status: product.status,
    imageUrl: product.imageUrl || "",
  }));
}

async function runAdminOpsAgent(action, payload = {}) {
  if (!adminToken || state.adminAgent.loading) return;
  state.adminAgent = {
    ...state.adminAgent,
    loading: true,
    action,
    error: "",
  };
  renderAdmin();
  try {
    const data = await api("/api/admin/ops-agent", {
      method: "POST",
      admin: true,
      body: JSON.stringify({
        action,
        prompt: payload.prompt || "",
        listingInput: payload.listingInput || {},
        supportInput: payload.supportInput || {},
        clientCatalog: getCompactClientCatalog(),
      }),
    });
    state.adminAgent = {
      loading: false,
      action,
      result: data,
      error: "",
    };
  } catch (error) {
    state.adminAgent = {
      ...state.adminAgent,
      loading: false,
      error: error.message,
    };
  }
  renderAdmin();
}

async function syncBrowserPricesToBackend() {
  const priceHealth = state.adminAgent.result?.localReport?.priceHealth || [];
  const mismatches = priceHealth.filter(item => !item.ok && item.browserPrice !== null && item.browserPrice !== undefined);
  if (!adminToken || !mismatches.length || state.adminAgent.loading) return;
  state.adminAgent.loading = true;
  state.adminAgent.error = "";
  renderAdmin();
  try {
    const data = await api("/api/admin/products/sync-browser-prices", {
      method: "POST",
      admin: true,
      body: JSON.stringify({
        clientCatalog: mismatches.map(item => ({ id: item.id, price: item.browserPrice })),
      }),
    });
    const updatedById = new Map((data.products || []).map(product => [product.id, product]));
    products = products.map(product => updatedById.has(product.id) ? { ...product, ...updatedById.get(product.id) } : product);
    cacheCatalog();
    state.adminAgent.loading = false;
    await loadProtectedData();
    await runAdminOpsAgent("price-health");
    alert(`${data.updatedCount || 0} browser prices saved to backend.`);
  } catch (error) {
    state.adminAgent.loading = false;
    state.adminAgent.error = error.message;
    renderAdmin();
  }
}

function renderAgentTextList(items, emptyText) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) return `<p class="admin-agent-empty">${escapeHtml(emptyText)}</p>`;
  return `<ul>${list.slice(0, 8).map(item => `<li>${escapeHtml(typeof item === "string" ? item : JSON.stringify(item))}</li>`).join("")}</ul>`;
}

function renderAgentIssueCards(items, type) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) return `<p class="admin-agent-empty">No ${type} found.</p>`;
  return list.slice(0, 8).map(item => {
    if (type === "duplicates") {
      const productList = (item.products || []).map(product => `${product.title || product.id} (${product.price || 0})`).join(" | ");
      return `<div class="admin-agent-mini-card"><strong>${escapeHtml(item.title || "Duplicate group")}</strong><span>${escapeHtml(productList)}</span></div>`;
    }
    if (type === "orders") {
      return `<div class="admin-agent-mini-card"><strong>${escapeHtml(item.id || "Order")}: ${escapeHtml(item.nextAction || item.status || "Review")}</strong><span>${escapeHtml(item.customer || "")} • ${escapeHtml(item.city || "")} • ${formatCoins(item.coins || 0)}</span></div>`;
    }
    if (type === "prices") {
      return `<div class="admin-agent-mini-card"><strong>${escapeHtml(item.title || item.id || "Product")}</strong><span>Backend: ${formatCoins(item.backendPrice || 0)}${item.browserPrice !== null && item.browserPrice !== undefined ? ` • Browser: ${formatCoins(item.browserPrice || 0)}` : ""} • ${escapeHtml(item.note || "")}</span></div>`;
    }
    return `<div class="admin-agent-mini-card"><strong>${escapeHtml(item.title || item.id || "Issue")}</strong><span>${escapeHtml((item.tags || item.actions || []).join(", ") || item.status || "Review required")}</span></div>`;
  }).join("");
}

function renderListingDraft(draft) {
  if (!draft || !Object.keys(draft).length) return `<p class="admin-agent-empty">No listing draft yet.</p>`;
  return `
    <div class="admin-agent-draft">
      <label>Title <input readonly value="${escapeHtml(draft.title || "")}" /></label>
      <label>Category <input readonly value="${escapeHtml(draft.category || "")}" /></label>
      <label>Coin Price <input readonly value="${escapeHtml(draft.price || "")}" /></label>
      <label>Condition <input readonly value="${escapeHtml(draft.condition || "")}" /></label>
      <label class="span-2">Checks <input readonly value="${escapeHtml((draft.checks || []).join(", "))}" /></label>
      <label class="span-2">Badges <input readonly value="${escapeHtml((draft.badges || []).join(", "))}" /></label>
      <label class="span-2">Description <textarea readonly>${escapeHtml(draft.description || "")}</textarea></label>
    </div>
  `;
}

function renderSupportDrafts(drafts) {
  const list = Array.isArray(drafts) ? drafts : [];
  if (!list.length) return `<p class="admin-agent-empty">No support draft yet.</p>`;
  return list.slice(0, 3).map(draft => `
    <div class="admin-agent-support-draft">
      <strong>${escapeHtml(draft.title || "Support reply")}</strong>
      <textarea readonly>${escapeHtml(draft.text || draft.reply || JSON.stringify(draft))}</textarea>
    </div>
  `).join("");
}

function renderAdminOpsAgent() {
  const agent = state.adminAgent;
  const result = agent.result;
  const report = result?.ai?.report || null;
  const localReport = result?.localReport || null;
  const priceMismatches = (localReport?.priceHealth || []).filter(item => !item.ok && item.browserPrice !== null && item.browserPrice !== undefined);
  const aiStatus = result
    ? result.ai?.enabled
      ? result.ai?.error
        ? `AI fallback: ${result.ai.error}`
        : `AI active${result.ai.model ? ` • ${result.ai.model}` : ""}`
      : "AI key not configured • local diagnostics active"
    : "Ready";
  return `
    <article class="wide-card admin-ops-agent">
      <div class="admin-ops-hero">
        <div>
          <span class="admin-agent-kicker">AI Admin Assistant</span>
          <strong>Admin Ops Agent</strong>
          <p>Runs inventory checks, duplicate detection, order summaries, price health, listing drafts, and support replies.</p>
        </div>
        <span class="admin-agent-status">${escapeHtml(aiStatus)}</span>
      </div>
      <div class="admin-agent-actions">
        <button class="primary-button" data-admin-agent-action="audit" type="button" ${agent.loading ? "disabled" : ""}>Full AI Audit</button>
        <button class="secondary-button" data-admin-agent-action="inventory" type="button" ${agent.loading ? "disabled" : ""}>Inventory Issues</button>
        <button class="secondary-button" data-admin-agent-action="price-health" type="button" ${agent.loading ? "disabled" : ""}>Price Health</button>
        <button class="secondary-button" data-admin-agent-action="orders" type="button" ${agent.loading ? "disabled" : ""}>Order Summary</button>
      </div>
      <form class="admin-agent-form" id="adminAgentListingForm">
        <strong>Create Listing Draft</strong>
        <input name="title" placeholder="Product name or supplier title" required />
        <input name="url" type="url" placeholder="Product/source link" />
        <input name="price" type="number" min="0" step="1" placeholder="Target coin price" />
        <select name="condition">
          <option>New</option>
          <option>Excellent</option>
          <option selected>Good</option>
          <option>Fair</option>
        </select>
        <textarea name="details" class="span-2" placeholder="Details, image notes, size, material, issue, or supplier notes"></textarea>
        <button class="primary-button" type="submit" ${agent.loading ? "disabled" : ""}>Generate Listing</button>
      </form>
      <form class="admin-agent-form two-col" id="adminAgentSupportForm">
        <strong>Support Reply Draft</strong>
        <input name="orderId" placeholder="Order ID optional" />
        <textarea name="query" class="span-2" placeholder="Customer question or situation" required></textarea>
        <button class="primary-button" type="submit" ${agent.loading ? "disabled" : ""}>Draft Reply</button>
      </form>
      <form class="admin-agent-form two-col" id="adminAgentPromptForm">
        <strong>Ask Admin Agent</strong>
        <textarea name="prompt" class="span-2" placeholder="Ask anything about products, orders, price health, or next admin actions" required></textarea>
        <button class="secondary-button" type="submit" ${agent.loading ? "disabled" : ""}>Ask Agent</button>
      </form>
      ${agent.loading ? `<div class="admin-agent-loading">Agent is checking your admin data...</div>` : ""}
      ${agent.error ? `<div class="admin-agent-error">${escapeHtml(agent.error)}</div>` : ""}
      ${report ? `
        <section class="admin-agent-result">
          <div class="admin-agent-summary">
            <strong>${escapeHtml(report.summary || "Admin Ops report")}</strong>
            <span>${escapeHtml(report.priority || "Review recommended")}</span>
          </div>
          ${localReport ? `
            <div class="admin-agent-metrics">
              <span><strong>${localReport.counts.zeroPriceProducts}</strong> zero price</span>
              <span><strong>${localReport.duplicateGroups.length}</strong> duplicate groups</span>
              <span><strong>${localReport.counts.pendingOrders}</strong> pending orders</span>
              <span><strong>${localReport.priceHealth.length}</strong> price checks</span>
            </div>
          ` : ""}
          <div class="admin-agent-grid">
            <section><h4>Insights</h4>${renderAgentTextList(report.insights, "No insights yet.")}</section>
            <section><h4>Next Actions</h4>${renderAgentTextList(report.actions, "No actions suggested.")}</section>
            <section><h4>Inventory Issues</h4>${renderAgentIssueCards(report.inventoryIssues || localReport?.inventoryIssues, "inventory issues")}</section>
            <section><h4>Duplicates</h4>${renderAgentIssueCards(report.duplicateGroups || localReport?.duplicateGroups, "duplicates")}</section>
            <section><h4>Orders</h4>${renderAgentIssueCards(report.orderSummaries || localReport?.orderSummaries, "orders")}</section>
            <section><h4>Price Health</h4>${priceMismatches.length ? `<button class="primary-button" data-sync-browser-prices type="button" ${agent.loading ? "disabled" : ""}>Save ${priceMismatches.length} Browser Prices</button>` : ""}${renderAgentIssueCards(report.priceHealth || localReport?.priceHealth, "prices")}</section>
            <section class="span-2"><h4>Listing Draft</h4>${renderListingDraft(report.listingDraft || localReport?.listingDraft)}</section>
            <section class="span-2"><h4>Support Drafts</h4>${renderSupportDrafts(report.supportDrafts)}</section>
          </div>
        </section>
      ` : ""}
    </article>
  `;
}

function formatAdminDate(value) {
  const timestamp = new Date(value || "").getTime();
  if (!Number.isFinite(timestamp)) return "Not available";
  return new Date(timestamp).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function renderAdminCustomers() {
  if (adminCustomersLoading) {
    return `
      <article class="wide-card">
        <strong>Customers</strong>
        <span>Loading customer data only now...</span>
      </article>
    `;
  }
  if (!adminCustomers) {
    return `
      <article class="wide-card admin-customers-intro">
        <div>
          <strong>Customers</strong>
          <span>Customer data is not loaded automatically. Click the button when you need owner access to customer records.</span>
        </div>
        <button class="primary-button" data-load-admin-customers type="button">Open Customer Data</button>
      </article>
    `;
  }
  const customers = adminCustomers.customers || [];
  return `
    <article class="wide-card admin-today-summary">
      <div>
        <span>Total Customers</span>
        <strong>${adminCustomers.totalUsers || 0}</strong>
      </div>
      <div>
        <span>Active Sessions</span>
        <strong>${adminCustomers.activeUsers || 0}</strong>
      </div>
      <div>
        <span>Loaded Now</span>
        <strong>${adminCustomers.returned || customers.length}</strong>
      </div>
      <div>
        <span>Data</span>
        <strong>Private</strong>
      </div>
    </article>
    <article class="wide-card">
      <div class="admin-section-head">
        <div>
          <strong>Customers <span class="admin-count-badge ${customers.length ? "has-items" : ""}">${customers.length}</span></strong>
          <span>Name, Gmail, login activity, wallet, and activity counts. Session tokens are never shown.</span>
        </div>
        <button class="secondary-button" data-load-admin-customers type="button">Refresh</button>
      </div>
      <div class="admin-list">
        ${customers.map(customer => `
          <div class="admin-row stacked">
            <span><strong>${escapeHtml(customer.name || "Name not entered")}</strong> • ${escapeHtml(customer.email || "Email not available")}</span>
            <span>Joined: ${escapeHtml(formatAdminDate(customer.createdAt))} • Last login: ${escapeHtml(formatAdminDate(customer.lastLoginAt))}</span>
            <span>Status: ${customer.activeSession ? "Active session" : "No active session"}${customer.sessionExpiresAt ? ` • Session expires: ${escapeHtml(formatAdminDate(customer.sessionExpiresAt))}` : ""}</span>
            <span>Wallet: ${formatCoins(customer.walletBalance || 0)} • Logins: ${Number(customer.loginCount || 0)} • Orders: ${Number(customer.orderCount || 0)} • Sell requests: ${Number(customer.sellRequestCount || 0)} • Recharges: ${Number(customer.rechargeRequestCount || 0)}</span>
          </div>
        `).join("") || `<p>No customers found yet.</p>`}
      </div>
    </article>
  `;
}

function renderAdminReferrals() {
  if (adminReferralsLoading) {
    return `
      <article class="wide-card">
        <strong>Influencer Referrals</strong>
        <span>Loading referral report only now...</span>
      </article>
    `;
  }
  if (!adminReferrals) {
    return `
      <article class="wide-card admin-customers-intro">
        <div>
          <strong>Influencer Referrals</strong>
          <span>Give influencers links like https://www.giveandtake.co.in/?ref=rahul10. Click below to load visits, signups, orders, and estimated commission.</span>
        </div>
        <button class="primary-button" data-load-admin-referrals type="button">Open Referral Report</button>
      </article>
    `;
  }
  const referrals = adminReferrals.referrals || [];
  return `
    <article class="wide-card admin-today-summary">
      <div>
        <span>Referral Codes</span>
        <strong>${adminReferrals.totalReferralCodes || 0}</strong>
      </div>
      <div>
        <span>Tracked Visits</span>
        <strong>${adminReferrals.totalVisits || 0}</strong>
      </div>
      <div>
        <span>Referral Orders</span>
        <strong>${adminReferrals.totalOrders || 0}</strong>
      </div>
      <div>
        <span>Est. Commission</span>
        <strong>${formatCoins(adminReferrals.totalEstimatedCommissionCoins || 0)}</strong>
      </div>
    </article>
    <article class="wide-card">
      <div class="admin-section-head">
        <div>
          <strong>Influencer Referral Report <span class="admin-count-badge ${referrals.length ? "has-items" : ""}">${referrals.length}</span></strong>
          <span>Commission estimate uses ${Number(adminReferrals.commissionRatePercent || 0)}%. Change REFERRAL_COMMISSION_PERCENT in Render if needed.</span>
        </div>
        <button class="secondary-button" data-load-admin-referrals type="button">Refresh</button>
      </div>
      <div class="admin-list">
        ${referrals.map(referral => `
          <div class="admin-row stacked">
            <span><strong>${escapeHtml(referral.code)}</strong> • Visits: ${Number(referral.visits || 0)} • Signups: ${Number(referral.signups || 0)} • Orders: ${Number(referral.orders || 0)}</span>
            <span>Link: <a href="${escapeSafeUrl(referral.link)}" target="_blank" rel="noopener">${escapeHtml(referral.link)}</a></span>
            <span>Total order value: ${formatCoins(referral.totalCoins || 0)} • Estimated commission: ${formatCoins(referral.estimatedCommissionCoins || 0)}</span>
            <span>Last visit: ${escapeHtml(formatAdminDate(referral.lastVisitAt))} • Last order: ${escapeHtml(formatAdminDate(referral.lastOrderAt))}</span>
            ${Array.isArray(referral.recentOrders) && referral.recentOrders.length ? `
              <span>Recent orders: ${referral.recentOrders.map(order => `${escapeHtml(order.id)} (${formatCoins(order.totalCoins || 0)})`).join(", ")}</span>
            ` : ""}
          </div>
        `).join("") || `
          <p>No referral data yet. Share a link like <strong>https://www.giveandtake.co.in/?ref=rahul10</strong>, then open this report after visits/orders.</p>
        `}
      </div>
    </article>
  `;
}

function renderAdmin() {
  if (!adminToken) {
    els.adminGrid.innerHTML = `
      <article class="wide-card">
        <strong>Admin Login</strong>
        <span>This section is private. Enter the admin password to continue.</span>
        <form class="inline-form" id="adminLoginForm">
          <input name="password" type="password" placeholder="Admin password" />
          <button class="primary-button" type="submit">Login</button>
        </form>
      </article>
    `;
    return;
  }
  if (!adminDashboard) {
    els.adminGrid.innerHTML = `<article class="wide-card"><strong>Admin</strong><span>Loading private admin data...</span></article>`;
    return;
  }
  const counts = adminDashboard.counts;
  const upi = adminDashboard.integrations.payments.upi || {};
  const adminSellRequests = adminDashboard.sellRequests || [];
  const adminRecharges = adminDashboard.rechargeRequests || [];
  const joinApplications = adminDashboard.joinApplications || [];
  const activeAdminOrders = adminDashboard.orders || [];
  const maintenance = adminDashboard.maintenance || {};
  const adminProducts = adminDashboard.products || [];
  const archived = adminDashboard.archived || {};
  const archivedOrderRecords = archived.orders || [];
  const adminOrderSource = state.adminOrderView === "archived" ? archivedOrderRecords : activeAdminOrders;
  const pendingRechargeCount = adminRecharges.filter(item => item.status === "pending-admin-verification").length;
  const pendingSellCount = adminSellRequests.filter(item => ["upload-submitted", "under-review", "pickup-scheduled"].includes(item.status || "upload-submitted")).length;
  const todayKey = new Date().toDateString();
  const todayOrders = [...activeAdminOrders, ...archivedOrderRecords].filter(order => order.createdAt && new Date(order.createdAt).toDateString() === todayKey);
  const todayRevenue = todayOrders.reduce((sum, order) => sum + Number(order.totalCoins || 0), 0);
  const archivedItems = [
    ...(archived.sellRequests || []).map(item => ({ type: "sellRequests", label: "Sell Request", id: item.id, title: item.title || item.id, meta: String(item.status || "request").replaceAll("-", " ") })),
    ...(archived.rechargeRequests || []).map(item => ({ type: "rechargeRequests", label: "Recharge", id: item.id, title: item.id, meta: `${item.amount || 0} coins • ${item.status || "request"}` })),
    ...(archived.joinApplications || []).map(item => ({ type: "joinApplications", label: "Join", id: item.id, title: item.name || item.role || item.id, meta: String(item.status || "application").replaceAll("-", " ") })),
  ];
  const adminSectionHeader = (key, title, count, openText) => {
    const collapsed = Boolean(state.adminCollapsed[key]);
    const badgeClass = count > 0 ? "admin-count-badge has-items" : "admin-count-badge";
    return `
      <div class="admin-section-head">
        <div>
          <strong>${title} <span class="${badgeClass}">${count}</span></strong>
          <span>${count ? openText : `No ${title.toLowerCase()} yet.`}</span>
        </div>
        <button class="secondary-button" data-admin-collapse="${key}" type="button">${collapsed ? "Show" : "Hide"}</button>
      </div>
    `;
  };
  const collapsedAdminPlaceholder = key => state.adminCollapsed[key] ? `<p class="admin-collapsed-note">Section hidden. Tap Show to load details.</p>` : "";
  const matchesAdminOrderSearch = order => {
    const query = state.adminSearch.trim().toLowerCase();
    if (!query) return true;
    const details = order.deliveryDetails || {};
    return [order.id, details.name, details.phone]
      .filter(Boolean)
      .some(value => String(value).toLowerCase().includes(query));
  };
  const filteredAdminOrders = adminOrderSource.filter(matchesAdminOrderSearch);
  const renderAdminOrder = order => {
    const details = order.deliveryDetails || {};
    const orderProducts = (order.products || order.productIds || []).map(item => {
      const productId = typeof item === "string" ? item : item.id;
      const product = products.find(next => next.id === productId) || {};
      return typeof item === "string" ? { id: item, ...product } : { ...product, ...item };
    });
    const orderProductImages = orderProducts.map(item => {
      const images = Array.isArray(item.images) ? item.images : [];
      return item.imageUrl || images[0] || "";
    }).filter(Boolean);
    const rawStatus = String(order.status || "new-order").toLowerCase();
    const placedDate = order.createdAt
      ? new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      : "Date not available";
    const statusRank = {
      "new-order": 0,
      confirmed: 1,
      packed: 2,
      "out-for-delivery": 3,
      delivered: 4,
      cancelled: 5,
    }[rawStatus] ?? 0;
    const finalStatus = ["delivered", "cancelled"].includes(rawStatus);
    const statusButton = (nextStatus, label, className, rank) => {
      const completed = statusRank >= rank;
      const disabled = completed || finalStatus || state.adminOrderView === "archived";
      const buttonText = completed && nextStatus !== "cancelled" ? `${label} ✓` : label;
      return `<button class="${className} ${completed ? "admin-status-done" : ""}" data-order-status="${escapeHtml(order.id)}" data-next-status="${escapeHtml(nextStatus)}" type="button" ${disabled ? "disabled" : ""}>${escapeHtml(buttonText)}</button>`;
    };
    return `
      <div class="admin-row stacked">
        <span><strong>${escapeHtml(order.id)}</strong> • ${escapeHtml(String(order.status || "").replaceAll("-", " "))} • ${formatCoins(order.totalCoins || 0)} • Delivery: ${Number(order.deliveryCharge || 0) === 0 ? "Free" : `Rs.${order.deliveryCharge} pay on delivery`}</span>
        <span>Placed on: ${escapeHtml(placedDate)}</span>
        <span>${escapeHtml(details.name || "Name not entered")} • ${escapeHtml(details.phone || "Phone not entered")} • ${escapeHtml(order.userEmail || order.userId || "User")}</span>
        <span>${escapeHtml(details.address || "Address not entered")} • ${escapeHtml(details.city || order.deliveryCity || "City not entered")} ${details.pincode ? `• ${escapeHtml(details.pincode)}` : ""}</span>
        ${order.cancellationReason ? `<span>Cancel reason: ${escapeHtml(order.cancellationReason)}</span>` : ""}
        <span>${orderProducts.map(item => escapeHtml(item.title || item.id || "Product")).join(", ")}</span>
        <div class="admin-order-images">
          ${orderProductImages.map((image, index) => `
            <a href="${escapeSafeImageUrl(image)}" target="_blank" rel="noopener" title="Open product image ${index + 1}">
              <img src="${escapeSafeImageUrl(image)}" alt="Ordered product image ${index + 1}" loading="lazy" />
            </a>
          `).join("") || `<span>No product image available</span>`}
        </div>
        <div class="admin-actions">
          ${state.adminOrderView === "active" ? `
            ${statusButton("confirmed", "Confirm", "secondary-button", 1)}
            ${statusButton("packed", "Packed", "secondary-button", 2)}
            ${statusButton("out-for-delivery", "Out for Delivery", "secondary-button", 3)}
            ${statusButton("delivered", "Delivered", "primary-button", 4)}
            <button class="danger-button ${rawStatus === "cancelled" ? "admin-status-done" : ""}" data-order-status="${escapeHtml(order.id)}" data-next-status="cancelled" type="button" ${finalStatus ? "disabled" : ""}>${rawStatus === "cancelled" ? "Cancelled ✓" : "Cancel"}</button>
            <button class="secondary-button admin-cut-button" data-admin-archive="orders" data-archive-id="${escapeHtml(order.id)}" type="button">${rawStatus === "delivered" ? "Archive" : "Cut"}</button>
          ` : `
            <button class="secondary-button" data-admin-unarchive="orders" data-archive-id="${escapeHtml(order.id)}" type="button">Restore</button>
          `}
        </div>
      </div>
    `;
  };
  const adminSectionSwitcher = `
    <article class="wide-card admin-section-switcher">
      <button class="${state.adminSection === "overview" ? "active" : ""}" data-admin-section="overview" type="button">Admin Overview</button>
      <button class="${state.adminSection === "customers" ? "active" : ""}" data-admin-section="customers" type="button">Customers</button>
      <button class="${state.adminSection === "referrals" ? "active" : ""}" data-admin-section="referrals" type="button">Referrals</button>
      <button class="${state.adminSection === "ops-agent" ? "active" : ""}" data-admin-section="ops-agent" type="button">Ops Agent</button>
      <button class="danger-button" data-admin-logout type="button">Admin Logout</button>
    </article>
  `;
  if (state.adminSection === "customers") {
    els.adminGrid.innerHTML = `
      ${adminSectionSwitcher}
      ${renderAdminCustomers()}
    `;
    return;
  }
  if (state.adminSection === "referrals") {
    els.adminGrid.innerHTML = `
      ${adminSectionSwitcher}
      ${renderAdminReferrals()}
    `;
    return;
  }
  if (state.adminSection === "ops-agent") {
    els.adminGrid.innerHTML = `
      ${adminSectionSwitcher}
      ${renderAdminOpsAgent()}
    `;
    return;
  }
  els.adminGrid.innerHTML = `
    ${adminSectionSwitcher}
    <article class="wide-card admin-today-summary">
      <div>
        <span>Orders Today</span>
        <strong>${todayOrders.length}</strong>
      </div>
      <div>
        <span>Revenue Today</span>
        <strong>${formatCoins(todayRevenue)}</strong>
      </div>
      <div>
        <span>Pending Recharge Requests</span>
        <strong>${pendingRechargeCount}</strong>
      </div>
      <div>
        <span>Pending Sell Requests</span>
        <strong>${pendingSellCount}</strong>
      </div>
    </article>
    <article class="wide-card admin-backup-card">
      <div>
        <strong>Recovery Backup</strong>
        <span>Download a private JSON backup of products, orders, wallets, requests, settings, and audit logs. OTP/session secrets are excluded.</span>
      </div>
      <button class="secondary-button" data-admin-backup-download type="button">Download Backup</button>
    </article>
    <article><strong>Product Review <span class="admin-count-badge ${counts.sellRequests > 0 ? "has-items" : ""}">${counts.sellRequests}</span></strong><span>${counts.sellRequests} sell requests in system</span></article>
    <article><strong>Inventory <span class="admin-count-badge ${counts.listedProducts > 0 ? "has-items" : ""}">${counts.listedProducts}</span></strong><span>${counts.listedProducts} listed of ${counts.products} products</span></article>
    <article><strong>Orders <span class="admin-count-badge ${activeAdminOrders.length > 0 ? "has-items" : ""}">${activeAdminOrders.length}</span></strong><span>${activeAdminOrders.length} active order records</span></article>
    <article><strong>Join Us <span class="admin-count-badge ${(counts.joinApplications || joinApplications.length || 0) > 0 ? "has-items" : ""}">${counts.joinApplications || joinApplications.length || 0}</span></strong><span>${counts.joinApplications || joinApplications.length || 0} applications in system</span></article>
    <article><strong>Returns</strong><span>${counts.returns} return requests</span></article>
    <article>
      <strong>Maintenance Mode</strong>
      <span>Full ${maintenance.full ? "on" : "off"} • paused: ${maintenance.pausedFeatures?.length || 0}</span>
      <button class="${maintenance.full ? "secondary-button" : "primary-button"}" data-maintenance-toggle="${maintenance.full ? "off" : "on"}" type="button">
        ${maintenance.full ? "Turn Off" : "Turn On"}
      </button>
    </article>
    <article><strong>Integrations</strong><span>UPI-only payment • external delivery apps disabled</span></article>
    <article class="wide-card">
      ${adminSectionHeader("sellRequests", "Sell Item Requests", adminSellRequests.length, "Review seller uploads, schedule pickup, and credit coins after final check.")}
      <div class="admin-list ${state.adminCollapsed.sellRequests ? "is-collapsed" : ""}">
        ${state.adminCollapsed.sellRequests ? collapsedAdminPlaceholder("sellRequests") : adminSellRequests.map(item => `
          <div class="admin-row stacked">
            <span><strong>${escapeHtml(item.title || "Untitled item")}</strong> • ${escapeHtml(item.category || "category")} • ${escapeHtml(item.condition || "condition")} • ${escapeHtml(item.status || "upload-submitted")}</span>
            <span>${formatCoins(item.expectedCoins || 0)} expected • ${escapeHtml(item.city || "City not entered")} • ${escapeHtml(item.userEmail || item.userId || "User")}</span>
            <span>Seller contact: ${escapeHtml(item.sellerName || "Name not entered")} • ${escapeHtml(item.sellerPhone || "Phone not entered")}</span>
            <span>Pickup: ${escapeHtml(item.pickupAddress || "Address/landmark not entered")}</span>
            <span>Preferred pickup: ${escapeHtml(item.pickupDate || "Date not selected")} • ${escapeHtml(item.pickupTime || "Time not selected")}</span>
            <span>${escapeHtml(item.details?.note || "No seller note entered")}</span>
            <div class="admin-photo-grid">
              ${(item.photos || []).map((photo, index) => `
                <a href="${escapeSafeImageUrl(photo)}" target="_blank" rel="noopener" aria-label="Open seller photo ${index + 1}">
                  <img src="${escapeSafeImageUrl(photo)}" alt="Seller uploaded product photo ${index + 1}" loading="lazy" />
                </a>
              `).join("") || `<span>No photos uploaded</span>`}
            </div>
            ${["upload-submitted", "under-review", "pickup-scheduled"].includes(item.status || "upload-submitted") ? `
              <div class="admin-actions">
                <button class="secondary-button" data-sell-request-action="${escapeHtml(item.id)}" data-action="schedule" type="button">Schedule Pickup</button>
                <button class="primary-button" data-sell-request-action="${escapeHtml(item.id)}" data-action="accept" data-expected="${escapeHtml(item.expectedCoins || 0)}" type="button">Accept + Credit Coins</button>
                <button class="danger-button" data-sell-request-action="${escapeHtml(item.id)}" data-action="reject" type="button">Reject</button>
                <button class="secondary-button admin-cut-button" data-admin-archive="sellRequests" data-archive-id="${escapeHtml(item.id)}" type="button">Cut</button>
              </div>
            ` : `
              ${item.status === "rejected" ? `<p class="admin-rejection-message"><strong>Reason sent to seller:</strong> ${escapeHtml(item.rejectionReason || item.reviewNote || "No reason recorded")}</p>` : ""}
              <div class="admin-actions"><button class="secondary-button admin-cut-button" data-admin-archive="sellRequests" data-archive-id="${escapeHtml(item.id)}" type="button">Cut</button></div>
            `}
          </div>
        `).join("")}
      </div>
    </article>
    <article class="wide-card">
      ${adminSectionHeader("recharges", "UPI Recharge Requests", adminRecharges.length, "Verify payment in your UPI account before approving.")}
      <div class="admin-list ${state.adminCollapsed.recharges ? "is-collapsed" : ""}">
        ${state.adminCollapsed.recharges ? collapsedAdminPlaceholder("recharges") : adminRecharges.map(item => {
          const isPending = item.status === "pending-admin-verification";
          return `
          <div class="admin-row">
            <span>${escapeHtml(item.id)} • ${formatCoins(item.amount || 0)} • ${escapeHtml(item.userEmail || item.userId || "User")} • ${escapeHtml(String(item.status || "request").replaceAll("-", " "))} • Ref: ${escapeHtml(item.upiReference || "not entered")}</span>
            <div class="admin-actions">
              ${isPending ? `
                <button class="primary-button" data-approve-recharge="${escapeHtml(item.id)}" type="button">Approve</button>
                <button class="danger-button" data-reject-recharge="${escapeHtml(item.id)}" type="button">Reject</button>
              ` : ""}
              <button class="secondary-button admin-cut-button" data-admin-archive="rechargeRequests" data-archive-id="${escapeHtml(item.id)}" type="button">Cut</button>
            </div>
          </div>
        `;
        }).join("")}
      </div>
    </article>
    <article class="wide-card">
      ${adminSectionHeader("orders", "Orders", filteredAdminOrders.length, "Customer and delivery details for placed orders.")}
      <div class="admin-list ${state.adminCollapsed.orders ? "is-collapsed" : ""}">
        ${state.adminCollapsed.orders ? collapsedAdminPlaceholder("orders") : `
        <div class="admin-order-tools">
          <input name="adminSearch" value="${escapeHtml(state.adminSearch)}" type="search" placeholder="Search order ID, customer name, phone" />
          <div class="admin-order-toggle">
            <button class="${state.adminOrderView === "active" ? "active" : ""}" data-admin-order-view="active" type="button">Active Orders <span class="admin-count-badge ${activeAdminOrders.length > 0 ? "has-items" : ""}">${activeAdminOrders.length}</span></button>
            <button class="${state.adminOrderView === "archived" ? "active" : ""}" data-admin-order-view="archived" type="button">Archived Orders <span class="admin-count-badge ${archivedOrderRecords.length > 0 ? "has-items" : ""}">${archivedOrderRecords.length}</span></button>
          </div>
        </div>
        ${filteredAdminOrders.map(renderAdminOrder).join("") || `<p>No matching ${state.adminOrderView === "archived" ? "archived" : "active"} orders found.</p>`}
        `}
      </div>
    </article>
    <article class="wide-card">
      ${adminSectionHeader("joinApplications", "Join Us Applications", joinApplications.length, "New applicants from the Join Us page.")}
      <div class="admin-list ${state.adminCollapsed.joinApplications ? "is-collapsed" : ""}">
        ${state.adminCollapsed.joinApplications ? collapsedAdminPlaceholder("joinApplications") : joinApplications.map(item => `
          <div class="admin-row stacked">
            <span><strong>${escapeHtml(item.role || "Applicant")}</strong> • ${escapeHtml(item.city || "City not entered")} • ${escapeHtml(item.status || "submitted")}</span>
            <span>${escapeHtml(item.name || "Name not entered")} • ${escapeHtml(item.phone || "Phone not entered")}</span>
            <span>${escapeHtml(item.experience || "No experience note entered")}</span>
            ${item.status === "submitted" ? `
              <div class="admin-actions">
                <button class="primary-button" data-accept-application="${escapeHtml(item.id)}" type="button">Accept</button>
                <button class="secondary-button" data-reject-application="${escapeHtml(item.id)}" type="button">Reject</button>
                <button class="secondary-button admin-cut-button" data-admin-archive="joinApplications" data-archive-id="${escapeHtml(item.id)}" type="button">Cut</button>
              </div>
            ` : `<div class="admin-actions"><button class="secondary-button admin-cut-button" data-admin-archive="joinApplications" data-archive-id="${escapeHtml(item.id)}" type="button">Cut</button></div>`}
          </div>
        `).join("")}
      </div>
    </article>
    <article class="wide-card">
      ${adminSectionHeader("archivedItems", "Cut Items", archivedItems.length, "Cut admin records are hidden from the main dashboard.")}
      <div class="admin-list ${state.adminCollapsed.archivedItems ? "is-collapsed" : ""}">
        ${state.adminCollapsed.archivedItems ? collapsedAdminPlaceholder("archivedItems") : archivedItems.map(item => `
          <div class="admin-row">
            <span><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.title || item.id)} • ${escapeHtml(item.meta || "")}</span>
            <div class="admin-actions">
              <button class="secondary-button" data-admin-unarchive="${escapeHtml(item.type)}" data-archive-id="${escapeHtml(item.id)}" type="button">Restore</button>
            </div>
          </div>
        `).join("") || `<p>No cut items yet.</p>`}
      </div>
    </article>
    <article class="wide-card">
      <strong>UPI Settings</strong>
      <form class="inline-form" id="upiSettingsForm">
        <input name="merchantName" value="${escapeHtml(upi.merchantName || "GIVE & TAKE")}" placeholder="Merchant name" />
        <input name="upiId" value="${escapeHtml(upi.upiId || "")}" placeholder="yourupi@bank" />
        <input name="note" value="${escapeHtml(upi.note || "")}" placeholder="Admin note" />
        <button class="primary-button" type="submit">Save UPI</button>
      </form>
    </article>
    <article class="wide-card">
      <strong>Add Product</strong>
      <span>Add real launch inventory after warehouse check. Product price must be in coins.</span>
      <form class="admin-product-form" id="adminProductForm">
        <input name="title" placeholder="Product name" required />
        <select name="category" required>
          ${categories.filter(category => category.id !== "mobiles").map(category => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`).join("")}
        </select>
        <input name="price" type="number" min="1" step="1" placeholder="Coin price" required />
        <select name="condition" required>
          <option>Excellent</option>
          <option selected>Good</option>
          <option>Fair</option>
          <option>Needs cleaning</option>
          <option>Needs repair</option>
        </select>
        <input name="quantity" type="number" min="1" step="1" value="5" placeholder="Quantity" />
        <input name="imageUrl" class="span-2" type="url" placeholder="Direct image URL (.jpg, .png, .webp)" aria-describedby="adminImageHint" />
        <label class="admin-file-field span-2">Upload product image from laptop/Mac
          <input name="imageFile" type="file" accept="image/*" />
        </label>
        <small class="admin-image-hint span-2" id="adminImageHint">Product-page link नहीं—image पर right-click करके “Copy Image Address” करें, या file upload करें.</small>
        <input name="checks" class="span-2" placeholder="Checks, comma separated: Warehouse checked, Cleaned, Tested" />
        <button class="primary-button" type="submit">Add Product</button>
      </form>
    </article>
    <article class="wide-card">
      <div class="admin-section-head">
        <div>
          <strong>Products Manager <span class="admin-count-badge ${adminProducts.length > 0 ? "has-items" : ""}">${adminProducts.length}</span></strong>
          <span>Open only when you need to edit, list, unlist, or delete products.</span>
        </div>
        <div class="admin-section-actions">
          <button class="secondary-button" data-admin-reset-stock type="button">Set All Stock 5</button>
          <button class="secondary-button" data-admin-products-toggle type="button">${state.adminShowProducts ? "Hide Products" : "Show Products"}</button>
        </div>
      </div>
      ${state.adminShowProducts ? `
        <div class="admin-product-manager">
          ${adminProducts.map(product => `
            <div class="admin-product-row">
              ${productVisual(product, "admin-product-thumb")}
              <div class="admin-product-info">
                <strong>${escapeHtml(product.title || "Untitled product")}</strong>
                <span>${escapeHtml(product.category || "category")} • ${escapeHtml(product.condition || "condition")} • ${escapeHtml(product.status || "status")}</span>
                <span>${formatCoins(product.price || 0)} • Stock: ${Number(product.quantity || 0)} left • Sold: ${Number(product.sold || 0)}</span>
              </div>
              <div class="admin-product-actions">
                <button class="secondary-button" data-edit-product="${escapeHtml(product.id)}" data-edit-field="title" type="button">Edit Name</button>
                <button class="secondary-button" data-edit-product="${escapeHtml(product.id)}" data-edit-field="price" type="button">Edit Price</button>
                <button class="secondary-button" data-edit-product="${escapeHtml(product.id)}" data-edit-field="quantity" type="button">Edit Stock</button>
                <button class="secondary-button" data-edit-product="${escapeHtml(product.id)}" data-edit-field="imageUrl" type="button">Edit Image</button>
                <button class="secondary-button" data-edit-product="${escapeHtml(product.id)}" data-edit-field="condition" type="button">Edit Condition</button>
                <button class="${product.status === "listed" ? "secondary-button" : "primary-button"}" data-product-status="${escapeHtml(product.id)}" data-next-status="${product.status === "listed" ? "unlisted" : "listed"}" type="button">
                  ${product.status === "listed" ? "Unlist Product" : "List Product"}
                </button>
                <button class="danger-button" data-delete-product="${escapeHtml(product.id)}" type="button">Delete Product</button>
              </div>
            </div>
          `).join("") || `<p>No products available yet.</p>`}
        </div>
      ` : ""}
    </article>
  `;
}

function renderPartnerTasks() {
  if (!adminToken) {
    els.partnerTasks.innerHTML = `
      <article class="task-card">
        <strong>Partner Login Required</strong>
        <span>Use admin login first, then open this panel again.</span>
      </article>
    `;
    return;
  }
  if (!partnerTasks.length) {
    els.partnerTasks.innerHTML = `
      <article class="task-card">
        <strong>No tasks</strong>
        <span>No partner tasks assigned right now.</span>
      </article>
    `;
    return;
  }
  els.partnerTasks.innerHTML = partnerTasks.map(task => `
    <article class="task-card">
      <strong>${escapeHtml(task.id)}</strong>
      <span>${escapeHtml(task.type.replaceAll("-", " "))} • ${escapeHtml(task.city)} • ${escapeHtml(task.status)}</span>
      <ul>${task.checklist.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <button class="secondary-button full" data-task-complete="${escapeHtml(task.id)}" type="button">Mark Checked</button>
    </article>
  `).join("");
}

function renderCart() {
  if (!state.cart.length) {
    state.checkoutStep = "cart";
    state.pendingRemoveCartId = null;
    const recommended = backendDataReady ? products
      .filter(product => product.status === "listed" && productStock(product) > 0)
      .slice(0, 4) : [];
    const cards = recommended.map(product => `
      <article class="empty-cart-product">
        <button class="empty-cart-product-link" data-product="${escapeHtml(product.id)}" type="button" aria-label="View ${escapeHtml(product.title || "recommended item")}">
          ${productVisual(product, "empty-cart-product-image")}
          <span>
            <strong>${escapeHtml(product.title || "Recommended item")}</strong>
            <em>${formatCoins(product.price || 0)}</em>
          </span>
        </button>
        <button class="secondary-button" data-add="${escapeHtml(product.id)}" type="button">Add</button>
      </article>
    `).join("");
    els.cartView.innerHTML = `
      <section class="empty-cart">
        <div class="empty-cart-head">
          <div class="cart-title-wrap">
            <span class="cart-title-icon" aria-hidden="true">🛒</span>
            <h1 class="cart-title">My Cart</h1>
          </div>
          <span class="cart-summary">0 Items • ${formatCoins(0)}</span>
        </div>
        <div class="empty-cart-panel">
          <div class="empty-cart-illustration" aria-hidden="true">
            <svg viewBox="0 0 96 96" role="img">
              <path d="M24 27h9l6 34h32l7-24H39" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M43 73a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm25 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" fill="currentColor"/>
              <path d="M29 19c5-5 13-6 19-1 6-5 15-4 20 1" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".35"/>
            </svg>
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Browse products and start exchanging today.</p>
          <a class="primary-button" href="#market">Browse Products</a>
        </div>
        <section class="cart-recommendations" aria-label="Recommended For You">
          <div class="cart-recommendations-head">
            <h2>Recommended For You</h2>
          </div>
          <div class="empty-cart-products">
            ${backendDataReady ? cards : loadingPanel("Loading latest prices...")}
          </div>
        </section>
      </section>
    `;
    return;
  }
  if (!backendDataReady) {
    els.cartView.innerHTML = loadingPanel("Loading latest cart prices...");
    return;
  }
  if (syncCartQuantitiesToStock()) {
    saveCartState();
    renderAuthStatus();
    if (!state.cart.length) {
      renderCart();
      return;
    }
  }
  const items = state.cart.map(id => products.find(product => product.id === id)).filter(Boolean);
  const total = items.reduce((sum, product) => sum + product.price * Number(state.cartQuantities[product.id] || 1), 0);
  const deliveryCharge = getDeliveryCharge(total);
  const itemCount = items.reduce((sum, product) => sum + Number(state.cartQuantities[product.id] || 1), 0);
  const hasEnoughCoins = (wallet.balance || 0) >= total;
  const savedAddress = currentUser?.addressBook || {};
  const delivery = Object.keys(state.deliveryDetails || {}).length ? state.deliveryDetails : {
    name: savedAddress.name || currentUser?.name || "",
    phone: savedAddress.phone || "",
    address: savedAddress.houseArea || "",
    city: savedAddress.city || "",
    pincode: savedAddress.pincode || "",
    landmark: savedAddress.landmark || "",
    note: "",
  };
  if (state.checkoutStep === "delivery") {
    els.cartView.innerHTML = `
      <form class="checkout-flow" id="deliveryDetailsForm">
        <section class="checkout-step">
          <h2>Delivery Details</h2>
          <div class="checkout-fields">
            <label>Full name <input name="name" value="${escapeHtml(delivery.name || "")}" placeholder="Customer name" required /></label>
            <label>Phone number <input name="phone" value="${escapeHtml(delivery.phone || "")}" placeholder="Mobile number" required /></label>
            <label>City
              <select name="city" required>
                ${["Lucknow", "Ayodhya", "Gonda"].map(city => `<option ${delivery.city === city ? "selected" : ""}>${city}</option>`).join("")}
              </select>
            </label>
            <label>Pincode / locality <input name="pincode" value="${escapeHtml(delivery.pincode || "")}" placeholder="Pincode or locality" /></label>
            <label class="span-2">Full address <textarea name="address" placeholder="House number, area, landmark" required>${escapeHtml(delivery.address || "")}</textarea></label>
            <label class="span-2">Landmark <input name="landmark" value="${escapeHtml(delivery.landmark || "")}" placeholder="Nearby landmark" /></label>
            <label class="span-2">Delivery note <textarea name="note" placeholder="Optional note for delivery">${escapeHtml(delivery.note || "")}</textarea></label>
          </div>
          <div class="checkout-nav">
            <button class="secondary-button" data-checkout-step="cart" type="button">Back to Cart</button>
            <button class="primary-button" type="submit">Continue</button>
          </div>
        </section>
      </form>
    `;
    return;
  }
  if (state.checkoutStep === "review") {
    const balance = Number(wallet.balance || 0);
    const additionalCoinsNeeded = Math.max(0, total - balance);
    els.cartView.innerHTML = `
      <form class="checkout-flow" id="checkoutForm">
        <section class="checkout-step checkout-review-step">
          <div class="checkout-review-head">
            <div>
              <h2>Confirm Order</h2>
              <p>Review your order before placing it.</p>
            </div>
            <div class="checkout-wallet-badge">
              <span>Wallet Balance</span>
              <strong>${formatCoins(balance)}</strong>
              <small>Available for purchases</small>
            </div>
          </div>
          ${additionalCoinsNeeded ? `
            <div class="checkout-warning-card">
              <strong>⚠️ Insufficient G&T Coins</strong>
              <span>You need ${formatCoins(additionalCoinsNeeded)} more to place this order.</span>
              <a class="primary-button" href="#wallet">Add Coins</a>
            </div>
          ` : ""}
          <div class="checkout-address-card">
            <span class="checkout-address-icon">⌖</span>
            <div>
              <small>Deliver To</small>
              <strong>${escapeHtml(delivery.name || "Customer")}</strong>
              <p>${escapeHtml([delivery.address, delivery.city, delivery.pincode, delivery.landmark ? `Near ${delivery.landmark}` : ""].filter(Boolean).join(" • ") || "Address not entered")}</p>
            </div>
          </div>
          <div class="checkout-items checkout-review-items">
            ${items.map(product => {
              const qty = Number(state.cartQuantities[product.id] || 1);
              return `
                <article class="checkout-review-item">
                  ${productVisual(product, "checkout-review-image")}
                  <div>
                    <strong>${escapeHtml(product.title)}</strong>
                    <span>Qty: ${qty}</span>
                  </div>
                  <strong class="checkout-review-price">${formatCoins(product.price * qty)}</strong>
                </article>
              `;
            }).join("")}
          </div>
          <section class="checkout-price-details" aria-label="Price details">
            <h3>Price Details</h3>
            <div>
              <span>Total Items</span>
              <strong>${itemCount}</strong>
            </div>
            <div>
              <span>Items Total</span>
              <strong>${formatCoins(total)}</strong>
            </div>
            <div>
              <span>Payment Method</span>
              <strong>G&T Coins</strong>
            </div>
            <div>
              <span>Delivery Charge</span>
              <strong>${deliveryCharge === 0 ? "Free" : `Rs.${deliveryCharge} Pay on Delivery`}</strong>
            </div>
            <div class="checkout-delivery-info">
              <span>🚚 Delivery in 3-4 Business Days</span>
              <span>✅ Free Delivery on Orders Above ${formatCoins(DELIVERY_FREE_THRESHOLD)}</span>
            </div>
            <div class="checkout-price-total">
              <span>Total Coins Required</span>
              <strong>${formatCoins(total)}</strong>
            </div>
          </section>
          <div class="checkout-nav">
            <button class="secondary-button" data-checkout-step="delivery" type="button">Back</button>
            ${hasEnoughCoins ? `<button class="primary-button" type="submit">Confirm Order</button>` : ""}
          </div>
        </section>
      </form>
    `;
    return;
  }
  els.cartView.innerHTML = `
    <section class="checkout-flow">
      <div class="empty-cart-head cart-filled-head">
        <div class="cart-title-wrap">
          <span class="cart-title-icon" aria-hidden="true">🛒</span>
          <h1 class="cart-title">My Cart</h1>
        </div>
        <span class="cart-summary">${itemCount} ${itemCount === 1 ? "Item" : "Items"} • ${formatCoins(total)}</span>
      </div>
      <div class="cart-items">
        ${items.map(product => {
          const qty = Number(state.cartQuantities[product.id] || 1);
          const stock = productStock(product);
          return `
            <article class="cart-item">
              ${productVisual(product, "cart-item-image")}
              <div class="cart-item-body">
                <strong>${escapeHtml(compactProductTitle(product.title, 64))}</strong>
                <span>${escapeHtml(displayCategoryName(product.category))} • ${escapeHtml(stockLabel(product))}</span>
                <div class="cart-price-row">
                  <div class="cart-qty-control" aria-label="Quantity">
                    <button type="button" data-cart-qty-step="${escapeHtml(product.id)}" data-step="-1" aria-label="Decrease quantity" ${qty <= 1 ? "disabled" : ""}>-</button>
                    <strong>${qty}</strong>
                    <button type="button" data-cart-qty-step="${escapeHtml(product.id)}" data-step="1" aria-label="Increase quantity" ${qty >= stock ? "disabled" : ""}>+</button>
                  </div>
                  <strong class="cart-line-price">${formatCoins(product.price * qty)}</strong>
                </div>
              </div>
              <div class="cart-item-actions">
                <button class="cart-remove-button" data-remove-cart="${escapeHtml(product.id)}" type="button">
                  <svg class="cart-remove-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 14h10l1-14"/><path d="M10 11v5"/><path d="M14 11v5"/></svg>
                  <span>Remove</span>
                </button>
                <button class="primary-button" data-cart-buy-now="${escapeHtml(product.id)}" type="button">Buy this now</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
      <section class="checkout-price-details cart-price-details" aria-label="Price details">
        <h3>Price Details</h3>
        <div>
          <span>Total Items</span>
          <strong>${itemCount}</strong>
        </div>
        <div>
          <span>Items Total</span>
          <strong>${formatCoins(total)}</strong>
        </div>
        <div>
          <span>Payment Method</span>
          <strong>G&T Coins</strong>
        </div>
        <div>
          <span>Delivery Charge</span>
          <strong>${deliveryCharge === 0 ? "Free" : `Rs.${deliveryCharge} Pay on Delivery`}</strong>
        </div>
        <div class="checkout-delivery-info">
          <span>🚚 Delivery in 3-4 Business Days</span>
          <span>✅ Free Delivery on Orders Above ${formatCoins(DELIVERY_FREE_THRESHOLD)}</span>
        </div>
        <div class="checkout-price-total">
          <span>Total Coins Required</span>
          <strong class="cart-required-coins">${formatCoins(total)}</strong>
        </div>
        <button class="primary-button" data-checkout-step="delivery" type="button">Place Order</button>
      </section>
      ${state.pendingRemoveCartId ? `
        <div class="cart-confirm-backdrop" role="presentation">
          <section class="cart-confirm-modal" role="dialog" aria-modal="true" aria-label="Remove item">
            <h2>Remove this item from cart?</h2>
            <div>
              <button class="secondary-button" data-cancel-remove-cart type="button">Cancel</button>
              <button class="primary-button danger-button" data-confirm-remove-cart="${escapeHtml(state.pendingRemoveCartId)}" type="button">Remove</button>
            </div>
          </section>
        </div>
      ` : ""}
    </section>
  `;
}

function renderAll() {
  renderSelectors();
  renderCategories();
  renderProducts();
  renderProductDetail();
  renderFormFields();
  renderWallet();
  renderOrders();
  renderAccount();
  renderAdmin();
  renderPartnerTasks();
  renderAuthStatus();
}

function renderCurrentRoute() {
  if (["home", "market", "category"].includes(state.route)) {
    renderProducts();
    return;
  }
  if (state.route === "product") {
    renderProductDetail();
    return;
  }
  if (state.route === "sell") {
    renderFormFields();
    return;
  }
  if (state.route === "wallet") {
    renderWallet();
    return;
  }
  if (state.route === "cart") {
    renderCart();
    return;
  }
  if (state.route === "orders") {
    renderOrders();
    return;
  }
  if (state.route === "account") {
    renderAccount();
    return;
  }
  if (state.route === "admin") {
    renderAdmin();
    return;
  }
  if (state.route === "partner") {
    renderPartnerTasks();
  }
}

function navigate(rawHash, shouldScroll = true) {
  const hash = (rawHash || location.hash || "#home").replace("#", "");
  const [route, value] = hash.split("/");
  state.route = route || "home";
  if (route === "category") state.category = value === "mobiles" ? "electronics" : value || "electronics";
  if (route === "product") state.productId = value || products[0].id;
  if (["account", "wallet", "orders", "cart", "sell"].includes(state.route) && !getCurrentUserId() && !authRestorePending) {
    state.route = "auth";
  }
  if (isMaintenanceActive() && state.route !== "admin") {
    state.route = "maintenance";
    const message = platformConfig.maintenance?.message || "GIVE & TAKE is under maintenance. We will be back soon.";
    const messageEl = document.getElementById("maintenanceMessage");
    if (messageEl) messageEl.textContent = message;
  }

  els.pages.forEach(page => page.classList.toggle("active", page.dataset.page === state.route));
  if (!document.querySelector(`.page[data-page="${state.route}"]`)) {
    state.route = "home";
    els.pages.forEach(page => page.classList.toggle("active", page.dataset.page === "home"));
  }
  document.querySelectorAll("[data-route-link]").forEach(link => {
    link.classList.toggle("active", link.dataset.routeLink === state.route);
  });
  renderCurrentRoute();
  if (state.route === "product" && state.productId) {
    const productId = state.productId;
    loadProductDetail(productId)
      .then(() => {
        if (state.route === "product" && state.productId === productId) renderProductDetail();
      })
      .catch(error => {
        console.warn(`Could not load product gallery: ${error.message}`);
      });
  }
  if (state.route === "partner" && adminToken && !partnerTasksLoaded) {
    loadPartnerTasks()
      .then(renderPartnerTasks)
      .catch(error => {
        console.warn(`Could not load partner tasks: ${error.message}`);
      });
  }
  renderAuthStatus();
  if (shouldScroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

function wireEvents() {
  const prefetchProductFromEvent = event => {
    const product = event.target.closest?.("[data-product]");
    if (product?.dataset.product) {
      preloadProductImage(product.dataset.product);
      preloadProductDetail(product.dataset.product);
    }
  };
  document.body.addEventListener("pointerover", prefetchProductFromEvent, { passive: true });
  document.body.addEventListener("pointerdown", prefetchProductFromEvent, { passive: true });

  document.body.addEventListener("click", async event => {
    const galleryImage = event.target.closest("[data-gallery-image]");
    if (galleryImage) {
      const image = galleryImage.dataset.galleryImage;
      const heroImage = galleryImage.closest(".detail-gallery")?.querySelector(".detail-image .product-photo");
      if (image && heroImage) {
        heroImage.src = image;
        galleryImage.parentElement?.querySelectorAll("button").forEach(button => button.classList.toggle("is-active", button === galleryImage));
      }
      return;
    }

    const logout = event.target.closest("[data-logout]");
    if (logout) {
      if (customerToken) {
        try {
          await api("/api/auth/logout", { method: "POST", customer: true, body: JSON.stringify({}) });
        } catch {}
      }
      if (adminToken) {
        try {
          await api("/api/admin/logout", { method: "POST", admin: true, body: JSON.stringify({}) });
        } catch {}
        clearAdminSession();
      }
      clearCustomerSession();
      pendingLoginEmail = "";
      pendingLoginName = "";
      wallet = { balance: 0, ledger: [] };
      orders = [];
      state.rechargeAmount = null;
      renderAll();
      location.hash = "auth";
      alert("Logged out.");
      return;
    }

    const adminLogout = event.target.closest("[data-admin-logout]");
    if (adminLogout) {
      if (!confirm("Logout from admin section? You will need the admin password again.")) return;
      try {
        adminLogout.disabled = true;
        adminLogout.textContent = "Logging out...";
        await api("/api/admin/logout", { method: "POST", admin: true, body: JSON.stringify({}) });
      } catch (error) {
        console.warn(`Admin logout request failed: ${error.message}`);
      }
      clearAdminSession();
      renderAdmin();
      renderPartnerTasks();
      alert("Admin logged out.");
      return;
    }

    const orderFilter = event.target.closest("[data-order-filter]");
    if (orderFilter) {
      state.orderFilter = orderFilter.dataset.orderFilter || "all";
      renderOrders();
      return;
    }

    const orderDetails = event.target.closest("[data-order-details]");
    if (orderDetails) {
      state.expandedOrderId = state.expandedOrderId === orderDetails.dataset.orderDetails ? null : orderDetails.dataset.orderDetails;
      renderOrders();
      return;
    }

    const editAddress = event.target.closest("[data-edit-address]");
    if (editAddress) {
      state.addressBookEditing = !state.addressBookEditing;
      renderAccount();
      return;
    }

    const category = event.target.closest("[data-category]");
    if (category) location.hash = `category/${category.dataset.category}`;

    const share = event.target.closest("[data-share-product]");
    if (share) {
      await shareProduct(share.dataset.shareProduct);
      return;
    }

    const product = event.target.closest("[data-product]");
    if (product?.dataset.product) {
      location.hash = `product/${product.dataset.product}`;
      return;
    }

    const add = event.target.closest("[data-add]");
    if (add) {
      addProductToCart(add.dataset.add);
      return;
    }

    const addStay = event.target.closest("[data-add-stay]");
    if (addStay) {
      addProductToCart(addStay.dataset.addStay);
      return;
    }

    const buyNow = event.target.closest("[data-buy-now]");
    if (buyNow) {
      const product = products.find(item => item.id === buyNow.dataset.buyNow) || productDetails.get(buyNow.dataset.buyNow);
      if (productStock(product) < 1) {
        showToast("This item is sold out");
        return;
      }
      state.cart = [buyNow.dataset.buyNow];
      state.cartQuantities = { [buyNow.dataset.buyNow]: 1 };
      state.checkoutStep = "cart";
      state.deliveryDetails = {};
      saveCartState();
      renderAuthStatus();
      location.hash = "cart";
      return;
    }

    const removeCart = event.target.closest("[data-remove-cart]");
    if (removeCart) {
      const productId = removeCart.dataset.removeCart;
      state.cart = state.cart.filter(id => id !== productId);
      delete state.cartQuantities[productId];
      state.checkoutStep = "cart";
      state.pendingRemoveCartId = null;
      if (!state.cart.length) state.deliveryDetails = {};
      saveCartState();
      renderCart();
      renderAuthStatus();
      return;
    }

    const cancelRemoveCart = event.target.closest("[data-cancel-remove-cart]");
    if (cancelRemoveCart) {
      state.pendingRemoveCartId = null;
      renderCart();
      return;
    }

    const confirmRemoveCart = event.target.closest("[data-confirm-remove-cart]");
    if (confirmRemoveCart) {
      const productId = confirmRemoveCart.dataset.confirmRemoveCart;
      state.cart = state.cart.filter(id => id !== productId);
      delete state.cartQuantities[productId];
      state.checkoutStep = "cart";
      state.pendingRemoveCartId = null;
      if (!state.cart.length) state.deliveryDetails = {};
      saveCartState();
      renderCart();
      renderAuthStatus();
      return;
    }

    const qtyStep = event.target.closest("[data-cart-qty-step]");
    if (qtyStep) {
      const productId = qtyStep.dataset.cartQtyStep;
      const step = Number(qtyStep.dataset.step || 0);
      const product = products.find(item => item.id === productId);
      const stock = productStock(product);
      if (stock < 1) {
        state.cart = state.cart.filter(id => id !== productId);
        delete state.cartQuantities[productId];
        showToast("This item is sold out");
        saveCartState();
        renderCart();
        renderAuthStatus();
        return;
      }
      const currentQty = Number(state.cartQuantities[productId] || 1);
      state.cartQuantities[productId] = Math.max(1, Math.min(stock, currentQty + step));
      saveCartState();
      renderCart();
      renderAuthStatus();
      return;
    }

    const cartBuyNow = event.target.closest("[data-cart-buy-now]");
    if (cartBuyNow) {
      const product = products.find(item => item.id === cartBuyNow.dataset.cartBuyNow);
      if (productStock(product) < 1) {
        showToast("This item is sold out");
        return;
      }
      state.cart = [cartBuyNow.dataset.cartBuyNow];
      state.cartQuantities = { [cartBuyNow.dataset.cartBuyNow]: 1 };
      state.checkoutStep = "delivery";
      saveCartState();
      renderCart();
      renderAuthStatus();
    }

    const checkoutStep = event.target.closest("[data-checkout-step]");
    if (checkoutStep) {
      if (checkoutStep.dataset.checkoutStep !== "cart" && syncCartQuantitiesToStock()) {
        saveCartState();
        showToast("Cart updated with available stock");
      }
      if (checkoutStep.dataset.checkoutStep !== "cart" && !state.cart.length) {
        renderCart();
        renderAuthStatus();
        return;
      }
      state.checkoutStep = checkoutStep.dataset.checkoutStep;
      saveCartState();
      renderCart();
      return;
    }

    const route = event.target.closest("[data-route]");
    if (route) location.hash = route.dataset.route;

    const copyUpi = event.target.closest("[data-copy-upi]");
    if (copyUpi) {
      const value = copyUpi.dataset.copyUpi || "";
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = value;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
        }
        copyUpi.textContent = "Copied";
        setTimeout(() => { copyUpi.textContent = "Copy"; }, 1200);
      } catch {
        alert("Could not copy UPI ID. Please copy it manually.");
      }
      return;
    }

    const recharge = event.target.closest("[data-recharge]");
    if (recharge) {
      if (!requireCustomerLogin()) return;
      const upi = await getConfiguredUpi();
      if (!upi.upiId) {
        alert("Admin UPI ID is not configured yet. Add it from the Admin page first.");
        return;
      }
      state.rechargeAmount = Number(recharge.dataset.recharge);
      renderWallet();
      document.querySelector(".payment-step")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const cancelRecharge = event.target.closest("[data-cancel-recharge]");
    if (cancelRecharge) {
      state.rechargeAmount = null;
      renderWallet();
    }

    const adminCollapse = event.target.closest("[data-admin-collapse]");
    if (adminCollapse) {
      const key = adminCollapse.dataset.adminCollapse;
      const willOpen = Boolean(state.adminCollapsed[key]);
      if (willOpen && adminDashboard?.summary) {
        adminCollapse.disabled = true;
        adminCollapse.textContent = "Loading...";
        try {
          await loadFullAdminData();
        } catch (error) {
          alert(error.message);
          adminCollapse.disabled = false;
          return;
        }
      }
      state.adminCollapsed[key] = !state.adminCollapsed[key];
      renderAdmin();
      return;
    }

    const adminOrderView = event.target.closest("[data-admin-order-view]");
    if (adminOrderView) {
      state.adminOrderView = adminOrderView.dataset.adminOrderView;
      renderAdmin();
      return;
    }

    const adminSection = event.target.closest("[data-admin-section]");
    if (adminSection) {
      state.adminSection = adminSection.dataset.adminSection || "overview";
      renderAdmin();
      return;
    }

    const loadCustomers = event.target.closest("[data-load-admin-customers]");
    if (loadCustomers) {
      await loadAdminCustomers();
      return;
    }

    const loadReferrals = event.target.closest("[data-load-admin-referrals]");
    if (loadReferrals) {
      await loadAdminReferrals();
      return;
    }

    const adminProductsToggle = event.target.closest("[data-admin-products-toggle]");
    if (adminProductsToggle) {
      state.adminShowProducts = !state.adminShowProducts;
      renderAdmin();
      return;
    }

    const adminResetStock = event.target.closest("[data-admin-reset-stock]");
    if (adminResetStock) {
      if (!confirm("Set stock quantity to 5 for all products? Sold products will become listed again.")) return;
      try {
        adminResetStock.disabled = true;
        adminResetStock.textContent = "Updating...";
        await api("/api/admin/products/reset-stock", {
          method: "POST",
          admin: true,
          body: JSON.stringify({ quantity: 5 }),
        });
        await loadBackendData();
        await refreshAdminProducts();
        renderAll();
        alert("All product stock is now set to 5.");
      } catch (error) {
        alert(error.message);
      } finally {
        adminResetStock.disabled = false;
        adminResetStock.textContent = "Set All Stock 5";
      }
      return;
    }

    const adminAgentAction = event.target.closest("[data-admin-agent-action]");
    if (adminAgentAction) {
      await runAdminOpsAgent(adminAgentAction.dataset.adminAgentAction || "audit");
      return;
    }

    const syncBrowserPrices = event.target.closest("[data-sync-browser-prices]");
    if (syncBrowserPrices) {
      await syncBrowserPricesToBackend();
      return;
    }

    const adminBackupDownload = event.target.closest("[data-admin-backup-download]");
    if (adminBackupDownload) {
      await downloadAdminBackup(adminBackupDownload);
      return;
    }

    const adminArchive = event.target.closest("[data-admin-archive]");
    if (adminArchive) {
      const archiveLabel = adminArchive.textContent.trim().toLowerCase() === "archive";
      if (!confirm(archiveLabel ? "Archive this order? It will move to Archived Orders." : "Cut this item from the admin list? It will be hidden from this admin section.")) return;
      try {
        adminArchive.disabled = true;
        await api("/api/admin/archive", {
          method: "POST",
          admin: true,
          body: JSON.stringify({
            type: adminArchive.dataset.adminArchive,
            id: adminArchive.dataset.archiveId,
          }),
        });
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        renderAdmin();
        alert(archiveLabel ? "Moved to Archived Orders." : "Cut from admin list.");
      } catch (error) {
        adminArchive.disabled = false;
        alert(error.message);
      }
      return;
    }

    const adminUnarchive = event.target.closest("[data-admin-unarchive]");
    if (adminUnarchive) {
      try {
        adminUnarchive.disabled = true;
        await api("/api/admin/archive", {
          method: "POST",
          admin: true,
          body: JSON.stringify({
            type: adminUnarchive.dataset.adminUnarchive,
            id: adminUnarchive.dataset.archiveId,
            archived: false,
          }),
        });
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        renderAdmin();
        alert("Restored.");
      } catch (error) {
        adminUnarchive.disabled = false;
        alert(error.message);
      }
      return;
    }

    const orderStatus = event.target.closest("[data-order-status]");
    if (orderStatus) {
      try {
        orderStatus.disabled = true;
        const nextStatus = orderStatus.dataset.nextStatus;
        const payload = { status: nextStatus };
        if (nextStatus === "cancelled") {
          const cancellationReason = prompt("Why are you cancelling this order? This reason will be shown to the user.");
          if (!cancellationReason || !cancellationReason.trim()) {
            orderStatus.disabled = false;
            return;
          }
          payload.cancellationReason = cancellationReason.trim();
        }
        await api(`/api/admin/orders/${orderStatus.dataset.orderStatus}`, {
          method: "PATCH",
          admin: true,
          body: JSON.stringify(payload),
        });
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        renderAdmin();
        alert("Order status updated.");
      } catch (error) {
        orderStatus.disabled = false;
        alert(error.message);
      }
    }

    const taskComplete = event.target.closest("[data-task-complete]");
    if (taskComplete) {
      try {
        taskComplete.disabled = true;
        const data = await api(`/api/partner/tasks/${taskComplete.dataset.taskComplete}`, {
          method: "PATCH",
          admin: true,
          body: JSON.stringify({ status: "doorstep-checked", proof: { checklist: "completed in partner panel" } }),
        });
        partnerTasks = partnerTasks.map(task => task.id === data.task.id ? data.task : task);
        renderPartnerTasks();
      } catch (error) {
        taskComplete.disabled = false;
        alert(error.message);
      }
    }

    const approveRecharge = event.target.closest("[data-approve-recharge]");
    if (approveRecharge) {
      try {
        approveRecharge.disabled = true;
        const data = await api(`/api/admin/recharges/${approveRecharge.dataset.approveRecharge}/approve`, {
          method: "POST",
          admin: true,
          body: JSON.stringify({}),
        });
        wallet = normalizeWallet(data.wallet);
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        await refreshCurrentWallet();
        renderAll();
        alert(`Approved ${data.rechargeRequest.amount} coins for ${data.rechargeRequest.userId}.`);
      } catch (error) {
        approveRecharge.disabled = false;
        alert(error.message);
      }
    }

    const rejectRecharge = event.target.closest("[data-reject-recharge]");
    if (rejectRecharge) {
      if (!confirm("Reject this recharge request? Coins will not be credited.")) return;
      try {
        rejectRecharge.disabled = true;
        const data = await api(`/api/admin/recharges/${rejectRecharge.dataset.rejectRecharge}/reject`, {
          method: "POST",
          admin: true,
          body: JSON.stringify({}),
        });
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        renderAdmin();
        alert(`Rejected recharge request: ${data.rechargeRequest.id}.`);
      } catch (error) {
        rejectRecharge.disabled = false;
        alert(error.message);
      }
    }

    const sellRequestAction = event.target.closest("[data-sell-request-action]");
    if (sellRequestAction) {
      const action = sellRequestAction.dataset.action;
      const requestId = sellRequestAction.dataset.sellRequestAction;
      let finalCoins = sellRequestAction.dataset.expected || "0";
      let pickupNote = "";
      let note = "";
      if (action === "schedule") {
        pickupNote = prompt(
          "Enter pickup message for seller:",
          "Pickup has been scheduled. GIVE & TAKE team will call you soon to confirm date, time, address, and product verification."
        );
        if (pickupNote === null) return;
      }
      if (action === "accept") {
        finalCoins = prompt("Enter final coins to credit after verification:", finalCoins);
        if (finalCoins === null) return;
      }
      if (action === "reject") {
        const enteredReason = prompt(
          "Why are you rejecting this item? This reason will be shown to the seller:",
          ""
        );
        if (enteredReason === null) return;
        note = enteredReason.trim();
        if (!note) {
          alert("A rejection reason is required. Please click Reject and enter the reason.");
          return;
        }
        if (!confirm("Reject this sell item request and send the reason to the seller?")) return;
      }
      try {
        sellRequestAction.disabled = true;
        const data = await api(`/api/admin/sell-requests/${requestId}/${action}`, {
          method: "POST",
          admin: true,
          body: JSON.stringify({ finalCoins, pickupNote, note }),
        });
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        await refreshCurrentWallet();
        if (currentUser) {
          const sellRequestData = await api("/api/sell-requests", { customer: true });
          sellRequests = sellRequestData.sellRequests || [];
        }
        renderAll();
        alert(`Sell request updated: ${data.sellRequest.id}`);
      } catch (error) {
        sellRequestAction.disabled = false;
        alert(error.message);
      }
    }

    const acceptApplication = event.target.closest("[data-accept-application]");
    if (acceptApplication) {
      try {
        acceptApplication.disabled = true;
        const data = await api(`/api/admin/join-applications/${acceptApplication.dataset.acceptApplication}/accept`, {
          method: "POST",
          admin: true,
          body: JSON.stringify({}),
        });
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        renderAdmin();
        alert(`Accepted application: ${data.application.id}`);
      } catch (error) {
        acceptApplication.disabled = false;
        alert(error.message);
      }
    }

    const rejectApplication = event.target.closest("[data-reject-application]");
    if (rejectApplication) {
      try {
        rejectApplication.disabled = true;
        const data = await api(`/api/admin/join-applications/${rejectApplication.dataset.rejectApplication}/reject`, {
          method: "POST",
          admin: true,
          body: JSON.stringify({}),
        });
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        renderAdmin();
        alert(`Rejected application: ${data.application.id}`);
      } catch (error) {
        rejectApplication.disabled = false;
        alert(error.message);
      }
    }

    const maintenanceToggle = event.target.closest("[data-maintenance-toggle]");
    if (maintenanceToggle) {
      try {
        maintenanceToggle.disabled = true;
        const nextFull = maintenanceToggle.dataset.maintenanceToggle === "on";
        const data = await api("/api/admin/maintenance", {
          method: "PATCH",
          admin: true,
          body: JSON.stringify({
            full: nextFull,
            message: "GIVE & TAKE is under maintenance. We will be back soon.",
          }),
        });
        adminDashboard.maintenance = data.maintenance;
        platformConfig.maintenance = data.maintenance;
        navigate(location.hash, false);
        renderAdmin();
        alert(nextFull ? "Maintenance mode is ON." : "Maintenance mode is OFF.");
      } catch (error) {
        maintenanceToggle.disabled = false;
        alert(error.message);
      }
    }

    const editProduct = event.target.closest("[data-edit-product]");
    if (editProduct) {
      const productId = editProduct.dataset.editProduct;
      const field = editProduct.dataset.editField;
      const product = (adminDashboard?.products || []).find(item => item.id === productId);
      if (!product) {
        alert("Product not found. Please refresh admin data.");
        return;
      }

      const labels = {
        title: "product name",
        price: "coin price",
        quantity: "stock quantity",
        imageUrl: "image URL",
        condition: "condition",
      };
      const currentValue = field === "price" ? product.price : product[field];
      const nextValue = prompt(`Enter new ${labels[field] || field}:`, currentValue ?? "");
      if (nextValue === null) return;

      const payload = {};
      if (field === "price") {
        const price = Number(nextValue);
        if (!Number.isFinite(price) || price < 0) {
          alert("Enter a valid coin price.");
          return;
        }
        payload.price = price;
      } else if (field === "quantity") {
        const quantity = Number(nextValue);
        if (!Number.isFinite(quantity) || quantity < 0 || !Number.isInteger(quantity)) {
          alert("Enter a valid stock quantity, like 0, 1, 5, or 10.");
          return;
        }
        payload.quantity = quantity;
      } else if (field === "imageUrl") {
        payload.imageUrl = String(nextValue).trim();
      } else {
        const text = String(nextValue).trim();
        if (!text) {
          alert("Value cannot be empty.");
          return;
        }
        payload[field] = text;
      }

      try {
        if (field === "imageUrl") await validateProductImageUrl(payload.imageUrl);
        const data = await api(`/api/admin/products/${productId}`, {
          method: "PATCH",
          admin: true,
          body: JSON.stringify(payload),
        });
        legacyPriceOverrides.delete(productId);
        saveProductToCachedCatalog(data.product);
        renderProducts();
        renderProductDetail();
        await refreshAdminProducts();
        alert("Product updated.");
      } catch (error) {
        alert(error.message);
      }
    }

    const productStatus = event.target.closest("[data-product-status]");
    if (productStatus) {
      try {
        await api(`/api/admin/products/${productStatus.dataset.productStatus}`, {
          method: "PATCH",
          admin: true,
          body: JSON.stringify({ status: productStatus.dataset.nextStatus }),
        });
        await refreshAdminProducts();
        alert(productStatus.dataset.nextStatus === "listed" ? "Product listed." : "Product unlisted.");
      } catch (error) {
        alert(error.message);
      }
    }

    const deleteProduct = event.target.closest("[data-delete-product]");
    if (deleteProduct) {
      const product = (adminDashboard?.products || []).find(item => item.id === deleteProduct.dataset.deleteProduct);
      const name = product?.title || "this product";
      if (!confirm(`Delete ${name}? This will remove it from admin and marketplace data.`)) return;
      try {
        await api(`/api/admin/products/${deleteProduct.dataset.deleteProduct}`, {
          method: "DELETE",
          admin: true,
        });
        await refreshAdminProducts();
        alert("Product deleted.");
      } catch (error) {
        alert(error.message);
      }
    }
  });

  window.addEventListener("hashchange", () => navigate());
  document.body.addEventListener("change", event => {
    const qtySelect = event.target.closest("[data-cart-qty]");
    if (qtySelect) {
      state.cartQuantities[qtySelect.dataset.cartQty] = Number(qtySelect.value || 1);
      saveCartState();
      renderCart();
      renderAuthStatus();
    }
  });
  document.body.addEventListener("input", event => {
    if (event.target.name === "adminSearch") {
      const cursor = event.target.selectionStart || event.target.value.length;
      state.adminSearch = event.target.value;
      renderAdmin();
      const searchInput = document.querySelector('input[name="adminSearch"]');
      searchInput?.focus();
      try {
        searchInput?.setSelectionRange(cursor, cursor);
      } catch {}
      return;
    }
    if (event.target.name === "customRechargeAmount") {
      const amount = Number(event.target.value);
      const submitButton = event.target.form?.querySelector("[data-custom-recharge-submit]");
      const hint = event.target.form?.querySelector("[data-custom-recharge-hint]");
      const isEmpty = event.target.value === "";
      const isValid = Number.isInteger(amount) && amount >= 50 && amount % 50 === 0;
      if (submitButton) submitButton.disabled = !isValid;
      if (hint) {
        hint.classList.toggle("valid", isValid);
        hint.classList.toggle("invalid", !isEmpty && !isValid);
        hint.textContent = isEmpty
          ? "Enter amount in multiples of 50"
          : isValid
            ? `${new Intl.NumberFormat("en-IN").format(amount)} coins ready to add`
            : "Amount must be a multiple of 50";
      }
    }
  });
  [els.categoryFilter, els.cityFilter, els.sortFilter].forEach(el => el.addEventListener("change", renderProducts));
  els.searchInput.addEventListener("input", event => {
    state.query = event.target.value;
    if (state.route !== "market") location.hash = "market";
    renderProducts();
  });
  els.sellCategory.addEventListener("change", renderFormFields);
  document.querySelector("#sellForm input[name='photos']")?.addEventListener("change", event => {
    addSellPhotoFiles(event.target.files);
    event.target.value = "";
  });
  document.getElementById("sellForm").addEventListener("submit", async event => {
    event.preventDefault();
    if (!requireCustomerLogin()) return;
    const sellForm = event.currentTarget;
    const submitButton = sellForm.querySelector("button[type='submit']");
    if (submitButton?.disabled) return;
    const form = new FormData(sellForm);
    const photoError = document.getElementById("sellPhotoError");
    if (isCustomerSellBlockedCategory(els.sellCategory.value)) {
      alert("Clothes and shoes are not accepted from customer sellers.");
      return;
    }
    if (photoError) {
      photoError.hidden = true;
      photoError.textContent = "";
    }
    try {
      setSubmitState(sellForm, true, "Submitting...");
      const photos = await collectSellPhotos();
      const data = await api("/api/sell-requests", {
        method: "POST",
        customer: true,
        body: JSON.stringify({
          sellerName: form.get("sellerName"),
          sellerPhone: form.get("sellerPhone"),
          pickupAddress: form.get("pickupAddress"),
          pickupDate: form.get("pickupDate"),
          pickupTime: form.get("pickupTime"),
          city: form.get("city"),
          category: els.sellCategory.value,
          title: form.get("title"),
          expectedCoins: Number(form.get("expectedCoins") || 0),
          condition: form.get("condition"),
          details: { note: form.get("details") },
          photos,
        }),
      });
      alert(`Upload submitted for review. Request ID: ${data.sellRequest.id}`);
      sellForm.reset();
      clearSellPhotoFiles(sellForm);
      renderFormFields();
      await loadBackendData();
      renderAll();
    } catch (error) {
      if (error.message.includes("product photos") && photoError) {
        photoError.textContent = error.message;
        photoError.hidden = false;
        sellForm.elements.photos?.focus();
        setSubmitState(sellForm, false);
        return;
      }
      alert(error.message);
    } finally {
      setSubmitState(sellForm, false);
    }
  });
  document.getElementById("joinForm").addEventListener("submit", async event => {
    event.preventDefault();
    const joinForm = event.currentTarget;
    const submitButton = joinForm.querySelector("button[type='submit']");
    if (submitButton?.disabled) return;
    const form = new FormData(joinForm);
    try {
      setSubmitState(joinForm, true, "Submitting...");
      const data = await api("/api/join-applications", {
        method: "POST",
        body: JSON.stringify({
          role: form.get("role"),
          city: form.get("city"),
          name: form.get("name"),
          phone: form.get("phone"),
          experience: form.get("experience"),
        }),
      });
      alert(`Application submitted. Application ID: ${data.application.id}`);
      joinForm.reset();
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitState(joinForm, false);
    }
  });
  document.getElementById("feedbackForm").addEventListener("submit", async event => {
    event.preventDefault();
    const feedbackForm = event.currentTarget;
    const submitButton = feedbackForm.querySelector("button[type='submit']");
    if (submitButton?.disabled) return;
    const form = new FormData(feedbackForm);
    try {
      setSubmitState(feedbackForm, true, "Submitting...");
      await api("/api/feedbacks", {
        method: "POST",
        customer: true,
        body: JSON.stringify({
          overallRating: Number(form.get("overallRating") || 0),
          browsingExperience: form.get("browsingExperience"),
          priceFeeling: form.get("priceFeeling"),
          paymentClarity: form.get("paymentClarity"),
          improvement: form.get("improvement"),
        }),
      });
      feedbackForm.reset();
      alert("Thank you. Your feedback has been submitted.");
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitState(feedbackForm, false);
    }
  });
  document.body.addEventListener("submit", async event => {
    if (event.target.id === "adminAgentListingForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      await runAdminOpsAgent("listing", {
        listingInput: {
          title: form.get("title"),
          url: form.get("url"),
          price: form.get("price"),
          condition: form.get("condition"),
          details: form.get("details"),
        },
      });
      return;
    }
    if (event.target.id === "adminAgentSupportForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      await runAdminOpsAgent("support", {
        supportInput: {
          orderId: form.get("orderId"),
          query: form.get("query"),
        },
      });
      return;
    }
    if (event.target.id === "adminAgentPromptForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      await runAdminOpsAgent("ask", {
        prompt: form.get("prompt"),
      });
      return;
    }
    if (event.target.id === "loginEmailForm") {
      event.preventDefault();
      const submitButton = event.target.querySelector("button[type='submit']");
      const form = new FormData(event.target);
      pendingLoginName = String(form.get("name") || "").trim();
      pendingLoginEmail = String(form.get("email") || "").trim();
      if (!pendingLoginName) {
        alert("Please enter your name.");
        return;
      }
      if (submitButton?.disabled) return;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }
      try {
        await api("/api/auth/request-otp", {
          method: "POST",
          body: JSON.stringify({ email: pendingLoginEmail }),
        });
        if (submitButton) {
          submitButton.textContent = "OTP Sent";
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Resend OTP";
          }, 60_000);
        }
        alert("OTP sent. Check your email inbox/spam.");
      } catch (error) {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send OTP";
        }
        alert(error.message);
      }
      return;
    }
    if (event.target.id === "loginOtpForm") {
      event.preventDefault();
      const submitButton = event.target.querySelector("button[type='submit']");
      if (submitButton?.disabled) return;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Verifying...";
      }
      const form = new FormData(event.target);
      try {
        const data = await api("/api/auth/verify-otp", {
          method: "POST",
          body: JSON.stringify({
            name: pendingLoginName,
            email: pendingLoginEmail,
            otp: String(form.get("otp") || "").trim(),
            referral: loadReferralAttribution(),
          }),
        });
        markCustomerSessionActive();
        currentUser = data.user || null;
        if (currentUser) localStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(currentUser));
        authRestorePending = false;
        customerDataReady = true;
        document.documentElement.classList.add("has-customer-token");
        wallet = normalizeWallet(data.wallet);
        cacheWallet(wallet);
        const loadedWithCookie = await loadBackendData();
        if (!loadedWithCookie && data.token) {
          customerToken = data.token;
          localStorage.removeItem(CUSTOMER_SESSION_HINT_KEY);
          await loadBackendData();
        }
        renderAll();
        location.hash = "wallet";
        alert("Login successful.");
      } catch (error) {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Verify OTP";
        }
        alert(error.message);
      }
      return;
    }
    if (event.target.id === "adminLoginForm") {
      event.preventDefault();
      const submitButton = event.target.querySelector("button[type='submit']");
      if (submitButton?.disabled) return;
      const form = new FormData(event.target);
      try {
        setSubmitState(event.target, true, "Logging in...");
        const data = await api("/api/admin/login", {
          method: "POST",
          body: JSON.stringify({ password: form.get("password") }),
        });
        markAdminSessionActive();
        const loadedWithCookie = await loadBackendData();
        if (!loadedWithCookie && !adminToken && data.token) {
          adminToken = data.token;
          localStorage.removeItem(ADMIN_SESSION_HINT_KEY);
          await loadBackendData();
        }
        renderAdmin();
        renderPartnerTasks();
        alert("Admin login successful.");
      } catch (error) {
        alert(error.message);
      } finally {
        setSubmitState(event.target, false);
      }
      return;
    }
    if (event.target.id === "deliveryDetailsForm") {
      event.preventDefault();
      const submitButton = event.target.querySelector("button[type='submit']");
      if (submitButton?.disabled) return;
      setSubmitState(event.target, true, "Continuing...");
      const form = new FormData(event.target);
      state.deliveryDetails = {
        name: form.get("name"),
        phone: form.get("phone"),
        address: form.get("address"),
        city: form.get("city"),
        pincode: form.get("pincode"),
        landmark: form.get("landmark"),
        note: form.get("note"),
      };
      state.checkoutStep = "review";
      saveCartState();
      renderCart();
      return;
    }
    if (event.target.id === "addressBookForm") {
      event.preventDefault();
      const submitButton = event.target.querySelector("button[type='submit']");
      if (submitButton?.disabled) return;
      const form = new FormData(event.target);
      try {
        setSubmitState(event.target, true, "Saving...");
        const data = await api("/api/auth/address", {
          method: "PATCH",
          customer: true,
          body: JSON.stringify({
            name: form.get("name"),
            phone: form.get("phone"),
            houseArea: form.get("houseArea"),
            city: form.get("city"),
            pincode: form.get("pincode"),
            landmark: form.get("landmark"),
          }),
        });
        currentUser = data.user || currentUser;
        if (currentUser) localStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(currentUser));
        state.addressBookEditing = false;
        renderAccount();
        alert("Address saved.");
      } catch (error) {
        alert(error.message);
      } finally {
        setSubmitState(event.target, false);
      }
      return;
    }
    if (event.target.id === "checkoutForm") {
      event.preventDefault();
      if (!requireCustomerLogin()) return;
      const submitButton = event.target.querySelector("button[type='submit']");
      if (submitButton?.disabled) return;
      if (syncCartQuantitiesToStock()) {
        saveCartState();
        renderCart();
        renderAuthStatus();
        alert("Cart was updated with available stock. Please review once and confirm again.");
        return;
      }
      const items = state.cart.map(id => products.find(product => product.id === id)).filter(Boolean);
      const total = items.reduce((sum, product) => sum + product.price * Number(state.cartQuantities[product.id] || 1), 0);
      if ((wallet.balance || 0) < total) {
        alert("Wallet has insufficient coins. Please recharge before confirming order.");
        location.hash = "wallet";
        return;
      }
      const deliveryDetails = state.deliveryDetails || {};
      const deliveryCharge = getDeliveryCharge(total);
      const orderItems = state.cart.map(id => ({
        productId: id,
        quantity: Number(state.cartQuantities[id] || 1),
      }));
      try {
        setSubmitState(event.target, true, "Placing order...");
        const data = await api("/api/orders", {
          method: "POST",
          customer: true,
          body: JSON.stringify({
            items: orderItems,
            city: deliveryDetails.city,
            deliveryChargeMode: "cod-rupees",
            deliveryCharge,
            deliveryDetails,
            referral: loadReferralAttribution(),
          }),
        });
        wallet = normalizeWallet(data.wallet);
        cacheWallet(wallet);
        currentUser = data.user || currentUser;
        if (currentUser) localStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(currentUser));
        orders.unshift(data.order);
        cacheOrders(orders);
        state.orderSuccessNotice = {
          orderId: data.order.id,
          warning: data.confirmationEmailWarning || "",
        };
        state.cart = [];
        state.cartQuantities = {};
        state.checkoutStep = "cart";
        state.deliveryDetails = {};
        saveCartState();
        await refreshCurrentWallet();
        await loadBackendData();
        renderAll();
        location.hash = "orders";
      } catch (error) {
        alert(error.message);
      } finally {
        setSubmitState(event.target, false);
      }
      return;
    }
    if (event.target.id === "adminProductForm") {
      event.preventDefault();
      const submitButton = event.target.querySelector("button[type='submit']");
      if (submitButton?.disabled) return;
      const form = new FormData(event.target);
      const checks = String(form.get("checks") || "")
        .split(",")
        .map(check => check.trim())
        .filter(Boolean);
      try {
        setSubmitState(event.target, true, "Adding...");
        const imageFile = event.target.elements.imageFile?.files?.[0];
        let imageUrl = String(form.get("imageUrl") || "").trim();
        if (imageFile) {
          if (!imageFile.type.startsWith("image/")) throw new Error("Please choose an image file.");
          imageUrl = await fileToCompressedDataUrl(imageFile);
        } else {
          if (!imageUrl) throw new Error("Add a direct image URL or upload the product image file.");
          await validateProductImageUrl(imageUrl);
        }
        await api("/api/admin/products", {
          method: "POST",
          admin: true,
          body: JSON.stringify({
            title: form.get("title"),
            category: form.get("category"),
            city: "Lucknow",
            price: form.get("price"),
            condition: form.get("condition"),
            quantity: form.get("quantity"),
            imageUrl,
            checks: checks.length ? checks : ["Warehouse checked"],
          }),
        });
        event.target.reset();
        await loadBackendData();
        await loadProtectedData();
        renderAll();
        alert("Product added to marketplace.");
      } catch (error) {
        alert(error.message);
      } finally {
        setSubmitState(event.target, false);
      }
      return;
    }
    if (event.target.id === "customRechargeForm") {
      event.preventDefault();
      if (!requireCustomerLogin()) return;
      const upi = await getConfiguredUpi();
      if (!upi.upiId) {
        alert("Admin UPI ID is not configured yet. Add it from the Admin page first.");
        return;
      }
      const form = new FormData(event.target);
      const amount = Number(form.get("customRechargeAmount"));
      if (!Number.isInteger(amount) || amount < 50 || amount % 50 !== 0) {
        alert("Enter an amount in multiples of 50.");
        return;
      }
      state.rechargeAmount = amount;
      renderWallet();
      document.querySelector(".payment-step")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (event.target.id === "upiReferenceForm") {
      event.preventDefault();
      if (!requireCustomerLogin()) return;
      const submitButton = event.target.querySelector("button[type='submit']");
      if (submitButton?.disabled) return;
      const form = new FormData(event.target);
      try {
        setSubmitState(event.target, true, "Submitting...");
        const data = await api("/api/wallet/recharge", {
          method: "POST",
          customer: true,
          body: JSON.stringify({
            amount: Number(state.rechargeAmount),
            method: "UPI",
            upiReference: form.get("upiReference"),
          }),
        });
        wallet = normalizeWallet(data.wallet);
        cacheWallet(wallet);
        state.rechargeAmount = null;
        await refreshCurrentWallet();
        renderAll();
        alert(`Recharge request submitted: ${data.rechargeRequest.id}. Coins will be credited after admin verifies payment.`);
      } catch (error) {
        alert(error.message);
      } finally {
        setSubmitState(event.target, false);
      }
      return;
    }
    if (event.target.id !== "upiSettingsForm") return;
    event.preventDefault();
    const submitButton = event.target.querySelector("button[type='submit']");
    if (submitButton?.disabled) return;
    const form = new FormData(event.target);
    try {
      setSubmitState(event.target, true, "Saving...");
      const data = await api("/api/admin/payments/upi", {
        method: "PATCH",
        admin: true,
        body: JSON.stringify({
          merchantName: form.get("merchantName"),
          upiId: form.get("upiId"),
          note: form.get("note"),
        }),
      });
      platformConfig.integrations.payments.upi = data.upi;
      const adminData = await api("/api/admin/dashboard", { admin: true });
      adminDashboard = adminData;
      renderWallet();
      renderAdmin();
      alert("UPI details saved.");
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitState(event.target, false);
    }
  });
  document.getElementById("langToggle").addEventListener("click", () => {
    alert("English is active for Phase 1. Hindi support can be connected in the next build pass.");
  });
}

async function init() {
  wireEvents();
  captureReferralFromUrl();
  navigate();
  renderAll();
  await loadAuthUser();
  renderAll();
  await loadBackendData();
  navigate(location.hash, false);
  renderAll();
}

init();
