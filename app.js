const configuredApiBase = window.GIVE_TAKE_API_BASE || "";
const API_BASE = location.protocol === "file:" ? "http://localhost:4173" : configuredApiBase;
const ADMIN_TOKEN_KEY = "give_take_admin_token";
const CUSTOMER_TOKEN_KEY = "give_take_customer_token";
const SUPABASE_URL = window.GIVE_TAKE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = window.GIVE_TAKE_SUPABASE_ANON_KEY || "";
const authClient = window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const fallbackCategories = [
  { id: "mobiles", name: "Mobiles", text: "Phones with IMEI, lock, battery, display, and diagnostic checks." },
  { id: "electronics", name: "Electronics", text: "Laptops, tablets, headphones, speakers, and smart devices." },
  { id: "books", name: "Books", text: "Study books, course sets, exam material, and novels." },
  { id: "furniture", name: "Furniture", text: "Tables, chairs, storage, and useful home furniture." },
  { id: "fashion", name: "Clothes & Shoes", text: "Clean, verified wearable items and accessories." },
  { id: "home", name: "Home & Kitchen", text: "Useful household, kitchen, decor, and appliance items." },
  { id: "bags", name: "Bags", text: "Backpacks, handbags, luggage, and office bags." },
  { id: "toys", name: "Toys & More", text: "Toys, hobby items, bundles, and low-value useful items." },
];

const SERVICE_CITIES_TEXT = "Lucknow, Ayodhya, Gonda";
const homeCategoryIds = ["electronics", "books", "furniture", "fashion", "home", "bags", "toys"];
const DELIVERY_CHARGE = 50;
const DELIVERY_FREE_THRESHOLD = 499;

const fallbackProducts = [
  {
    id: "gtl01",
    title: "Disposable Waterproof Shower Cap for Women - 1 Pack",
    category: "home",
    city: "Lucknow",
    price: 2,
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
    price: 3,
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
    price: 3,
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
    price: 3,
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
    price: 3,
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
    price: 3,
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
    price: 4,
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
    price: 4,
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
    price: 5,
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
    price: 6,
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
    price: 6,
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
    price: 6,
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
    category: "furniture",
    city: "Lucknow",
    price: 7,
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
    price: 7,
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
    price: 7,
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
    price: 101,
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
    price: 101,
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
    price: 101,
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
    price: 101,
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
    price: 101,
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
    category: "furniture",
    city: "Gonda",
    price: 101,
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
    price: 101,
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
    price: 101,
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
    price: 101,
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
    price: 101,
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
    price: 102,
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
    price: 102,
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
    category: "furniture",
    city: "Lucknow",
    price: 102,
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
    price: 103,
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
    price: 105,
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
    price: 302,
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
    price: 302,
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
    price: 302,
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
    price: 302,
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
    price: 305,
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
    category: "furniture",
    city: "Gonda",
    price: 306,
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
    price: 309,
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
    price: 310,
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
    price: 310,
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
    category: "furniture",
    city: "Lucknow",
    price: 314,
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
    price: 315,
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
    price: 318,
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
    price: 319,
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
    price: 319,
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
    price: 319,
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
    price: 320,
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
    price: 323,
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
    price: 324,
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
    price: 324,
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
    price: 324,
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
    price: 807,
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
    category: "furniture",
    city: "Lucknow",
    price: 821,
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
    category: "furniture",
    city: "Ayodhya",
    price: 828,
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
    price: 833,
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
    price: 833,
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

let categories = [...fallbackCategories];
let products = [...fallbackProducts];
let wallet = { balance: 0, ledger: [] };
let orders = [];
let sellRequests = [];
let adminDashboard = null;
let partnerTasks = [];
let adminToken = localStorage.getItem(ADMIN_TOKEN_KEY) || "";
let customerToken = localStorage.getItem(CUSTOMER_TOKEN_KEY) || "";
let currentUser = null;
let authRestorePending = Boolean(customerToken);
let pendingLoginEmail = "";
let pendingLoginName = "";
let platformConfig = {
  integrations: {
    payments: {
      upi: { merchantName: "GIVE & TAKE", upiId: "", note: "" }
    }
  }
};

function normalizeWallet(nextWallet) {
  return nextWallet && typeof nextWallet.balance === "number"
    ? { balance: nextWallet.balance, ledger: Array.isArray(nextWallet.ledger) ? nextWallet.ledger : [] }
    : { balance: 0, ledger: [] };
}

const state = {
  route: "home",
  category: null,
  productId: null,
  cart: [],
  cartQuantities: {},
  checkoutStep: "cart",
  deliveryDetails: {},
  query: "",
  rechargeAmount: null,
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
  if (options.admin && adminToken) headers.Authorization = `Bearer ${adminToken}`;
  if (options.customer && customerToken) headers.Authorization = `Bearer ${customerToken}`;
  const response = await fetch(`${API_BASE}${path}`, {
    headers,
    ...options,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

async function loadBackendData() {
  try {
    const userId = getCurrentUserId();
    const [configData, categoryData, productData, walletData, orderData, sellRequestData] = await Promise.all([
      api("/api/config"),
      api("/api/categories"),
      api("/api/products?sort=trending"),
      userId ? api(`/api/wallet/${encodeURIComponent(userId)}`) : Promise.resolve({ wallet: { balance: 0, ledger: [] } }),
      userId ? api(`/api/orders?userId=${encodeURIComponent(userId)}`) : Promise.resolve({ orders: [] }),
      userId ? api(`/api/sell-requests?userId=${encodeURIComponent(userId)}`) : Promise.resolve({ sellRequests: [] }),
    ]);
    categories = categoryData.categories;
    products = productData.products;
    wallet = normalizeWallet(walletData.wallet);
    orders = orderData.orders;
    sellRequests = sellRequestData.sellRequests || [];
    platformConfig = configData;
    if (adminToken) await loadProtectedData();
    return true;
  } catch (error) {
    console.warn("Using local fallback data:", error.message);
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
    return;
  }
  const data = await api(`/api/wallet/${encodeURIComponent(userId)}`);
  wallet = normalizeWallet(data.wallet);
}

async function loadAuthUser() {
  if (!customerToken) {
    authRestorePending = false;
    document.documentElement.classList.remove("has-customer-token");
    return;
  }
  try {
    const data = await api("/api/auth/me", { customer: true });
    currentUser = data.user || null;
    wallet = normalizeWallet(data.wallet);
    document.documentElement.classList.toggle("has-customer-token", Boolean(currentUser));
  } catch {
    customerToken = "";
    localStorage.removeItem(CUSTOMER_TOKEN_KEY);
    currentUser = null;
    document.documentElement.classList.remove("has-customer-token");
  } finally {
    authRestorePending = false;
  }
}

function renderAuthStatus() {
  const authLink = document.getElementById("authNavLink");
  const heroLoginLink = document.getElementById("heroLoginLink");
  const cartNavLink = document.getElementById("cartNavLink");
  const hasCustomerSession = Boolean(currentUser) || authRestorePending;
  if (authLink) {
    authLink.textContent = hasCustomerSession ? "My Account" : "Login";
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
    heroLoginLink.textContent = hasCustomerSession ? "My Account" : "Login";
    heroLoginLink.href = hasCustomerSession ? "#account" : "#auth";
  }
}

async function loadProtectedData() {
  const [adminData, taskData] = await Promise.all([
    api("/api/admin/dashboard", { admin: true }),
    api("/api/partner/tasks", { admin: true }),
  ]);
  adminDashboard = adminData;
  partnerTasks = taskData.tasks;
}

async function refreshAdminProducts() {
  const [adminData, productData] = await Promise.all([
    api("/api/admin/dashboard", { admin: true }),
    api("/api/products?sort=trending"),
  ]);
  adminDashboard = adminData;
  products = productData.products;
  renderAdmin();
  renderProducts();
  renderProductDetail();
}

function formatCoins(value) {
  return `${new Intl.NumberFormat("en-IN").format(value)} <span class="coin-symbol" aria-label="G&T coins"></span>`;
}

function coinMarkup() {
  return `<span class="coin-symbol" aria-label="G&T coins"></span>`;
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

function productVisual(product, className = "product-visual") {
  const fallbackStyle = `--art-a:${product.artA};--art-b:${product.artB}`;
  if (product.imageUrl) {
    return `
      <div class="${className}" style="${fallbackStyle}">
        <img class="product-photo" src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.title)}" loading="lazy" />
      </div>
    `;
  }
  return `<div class="${className}" style="${fallbackStyle}"></div>`;
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
  return charge === 0 ? "Free delivery" : `Rs.${charge} cash on delivery`;
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
  if (!state.cart.includes(productId)) {
    state.cart.push(productId);
    state.cartQuantities[productId] = 1;
  } else {
    state.cartQuantities[productId] = Math.min(Number(state.cartQuantities[productId] || 1) + 1, 5);
  }
  state.checkoutStep = "cart";
  renderAuthStatus();
  if (state.route === "cart") renderCart();
  animateCartBadge();
  showToast("Item added to cart");
}

function card(product) {
  return `
    <article class="product-card">
      ${productVisual(product)}
      <div class="product-body">
        <div class="badges">
          <span class="badge">${escapeHtml(product.source)}</span>
        </div>
        <h3 title="${escapeHtml(product.title)}">${escapeHtml(compactProductTitle(product.title))}</h3>
        <div class="coin-price">${formatCoins(product.price)}</div>
        <p>${escapeHtml(displayCategoryName(product.category))}</p>
        <div class="card-actions">
          <button class="primary-button" data-product="${product.id}" type="button">View</button>
          <button class="secondary-button" data-add="${product.id}" type="button" title="Add to cart">+</button>
        </div>
      </div>
    </article>
  `;
}

function renderCategories() {
  const homeCategories = homeCategoryIds
    .map(id => categories.find(category => category.id === id))
    .filter(Boolean);
  els.categoryGrid.innerHTML = homeCategories.map((category, index) => `
    <article class="category-card" data-category="${category.id}">
      <div class="category-icon" style="filter:hue-rotate(${index * 26}deg)"></div>
      <div>
        <h3>${escapeHtml(category.name)}</h3>
      </div>
    </article>
  `).join("");
}

function renderSelectors() {
  const selectableCategories = categories.filter(category => category.id !== "mobiles");
  els.categoryFilter.innerHTML = `<option value="all">All categories</option>` + selectableCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
  els.sellCategory.innerHTML = selectableCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
}

function getFilteredProducts() {
  const category = els.categoryFilter?.value || "all";
  const city = els.cityFilter?.value || "all";
  const sort = els.sortFilter?.value || "trending";
  const query = state.query.toLowerCase();
  let list = [...products].filter(product => {
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
  els.featuredProducts.innerHTML = products.slice(0, 8).map(card).join("");
  els.productGrid.innerHTML = getFilteredProducts().map(card).join("");
  if (state.category) {
    const category = categories.find(item => item.id === state.category);
    els.categoryTitle.textContent = category.name;
    els.categoryProducts.innerHTML = products.filter(product => product.category === state.category || (state.category === "electronics" && product.category === "mobiles")).map(card).join("");
  }
}

function renderProductDetail() {
  const product = products.find(item => item.id === state.productId) || products[0];
  const hiddenChecks = new Set(["Original price listed", "Admin price editable"]);
  const visibleChecks = (product.checks || []).filter(check => !hiddenChecks.has(check));
  els.productDetail.innerHTML = `
    ${productVisual(product, "detail-image")}
    <article class="detail-panel">
      <div class="badges">
        <span class="badge">${product.source}</span>
        <span class="badge">${product.condition}</span>
        ${product.badges.map(badge => `<span class="badge">${badge}</span>`).join("")}
      </div>
      <h1>${product.title}</h1>
      <div class="coin-price">${formatCoins(product.price)}</div>
      <p>Product price is coin-only. Delivery charge can be paid by coins online or cash on delivery.</p>
      <div class="checklist">
        ${visibleChecks.map(check => `<span>${check}</span>`).join("")}
      </div>
      <div class="detail-actions">
        <button class="primary-button" data-buy-now="${product.id}" type="button">Buy with Coins</button>
        <button class="secondary-button" data-add-stay="${product.id}" type="button">Add to Cart</button>
      </div>
    </article>
  `;
}

function renderFormFields() {
  const category = els.sellCategory.value;
  const fieldMap = {
    mobiles: ["Brand and model", "Storage/RAM", "IMEI available?", "Bill/warranty", "Battery/display issues"],
    electronics: ["Brand/model/serial", "Power and charging status", "Accessories included", "Known defects"],
    books: ["Class/course/subject", "Edition/year", "Pages missing?", "Writing/highlighting condition"],
    furniture: ["Material", "Cracks/scratches"],
    fashion: ["Size", "Brand", "Cleanliness", "Stains/tears"],
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

async function collectSellPhotos(fileList) {
  const files = [...(fileList || [])].filter(file => file.type.startsWith("image/")).slice(0, 6);
  return Promise.all(files.map(fileToCompressedDataUrl));
}

function renderWallet() {
  const upi = platformConfig.integrations?.payments?.upi || {};
  document.getElementById("walletUpiNotice")?.remove();
  if (state.rechargeAmount) {
    els.rechargeGrid.classList.add("payment-step");
    els.rechargeGrid.innerHTML = `
      <div class="payment-summary">
        <span>Selected amount</span>
        <strong>${formatCoins(state.rechargeAmount)}</strong>
      </div>
      <div class="upi-payment-box">
        <span>Pay using any UPI app</span>
        <strong>${upi.upiId ? escapeHtml(upi.upiId) : "UPI ID not configured"}</strong>
        <small>After payment, enter your UPI transaction/reference ID below.</small>
        <a class="primary-button upi-open-button" href="${escapeHtml(buildUpiPayUrl(state.rechargeAmount))}">Open UPI App</a>
      </div>
      <form class="upi-reference-form" id="upiReferenceForm">
        <input name="upiReference" placeholder="Enter UPI transaction/reference ID" required />
        <button class="primary-button" type="submit">Submit Recharge Request</button>
        <button class="secondary-button" data-cancel-recharge type="button">Change Amount</button>
      </form>
    `;
  } else {
    els.rechargeGrid.classList.remove("payment-step");
    els.rechargeGrid.innerHTML = [50, 100, 150, 200, 250, 500, 1000, 2000, 5000].map(amount => `
      <button type="button" data-recharge="${amount}">${amount} <span class="coin-symbol" aria-label="G&T coins"></span></button>
    `).join("");
  }
  els.walletBalance.textContent = new Intl.NumberFormat("en-IN").format(wallet.balance || 0);
  const walletHeading = document.querySelector("#page-wallet .page-title h1");
  if (walletHeading) walletHeading.innerHTML = `${new Intl.NumberFormat("en-IN").format(wallet.balance || 0)} <span class="coin-symbol large" aria-label="G&T coins"></span> available.`;
  const ledger = wallet.ledger || [];
  els.ledgerList.innerHTML = ledger.map(entry => {
    const sign = entry.type === "debit" ? "-" : "+";
    return `<div class="ledger-item"><strong>${sign}${new Intl.NumberFormat("en-IN").format(entry.amount)}</strong><span>${entry.reason}</span></div>`;
  }).join("") || `<p>No wallet activity yet.</p>`;
}

function renderOrders() {
  const list = orders || [];
  const activeOrders = list.filter(order => !["delivered", "cancelled", "completed"].includes(String(order.status || "").toLowerCase())).length;
  const completedOrders = list.length - activeOrders;
  const summary = document.querySelector("#page-orders .orders-summary");
  if (summary) summary.textContent = `${list.length} Orders • ${activeOrders} Active • ${completedOrders} Completed`;
  if (!list.length) {
    const recommended = products
      .filter(product => product.status === "listed")
      .slice(0, 4);
    const cards = (recommended.length ? recommended : fallbackProducts.slice(0, 4)).map(product => `
      <article class="empty-cart-product">
        ${productVisual(product, "empty-cart-product-image")}
        <div>
          <strong>${escapeHtml(product.title || "Recommended item")}</strong>
          <span>${formatCoins(product.price || 0)}</span>
        </div>
        <button class="secondary-button" data-add="${product.id}" type="button">Add</button>
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
  els.ordersGrid.innerHTML = list.map(order => `
    <article class="order-card">
      <strong>${order.id}</strong>
      <span>${String(order.status || "").replaceAll("-", " ")}</span>
      <span>Delivery: ${Number(order.deliveryCharge || 0) === 0 ? "Free" : `Rs.${order.deliveryCharge} COD`}</span>
      <div class="mini-steps">
        ${(order.timeline || []).slice(0, 4).map(step => `<span>${String(step).replaceAll("-", " ")}</span>`).join("")}
      </div>
    </article>
  `).join("");
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
  const avatarLetter = (displayName !== "User" ? displayName : email || "U").trim().charAt(0).toUpperCase() || "U";
  const balance = Number(wallet.balance || 0);
  const sellRequestCount = sellRequests.length;
  const renderSellRequestMessage = request => {
    const status = String(request.status || "upload-submitted");
    const readableStatus = status.replaceAll("-", " ");
    const pickupNote = request.pickupNote || "Pickup has been scheduled. GIVE & TAKE team will contact you soon for pickup timing and verification.";
    const statusNotes = {
      "upload-submitted": "Your item is waiting for admin review.",
      "under-review": "Admin is reviewing your item details.",
      "pickup-scheduled": pickupNote,
      rejected: request.reviewNote || "This item request was rejected by admin.",
      accepted: `${new Intl.NumberFormat("en-IN").format(request.finalCoins || request.expectedCoins || 0)} coins credited after final approval.`,
    };
    return `
      <div class="account-status-item ${status === "pickup-scheduled" ? "highlight" : ""}">
        <strong>${escapeHtml(request.title || "Item")} • ${escapeHtml(readableStatus)}</strong>
        <span>${escapeHtml(statusNotes[status] || readableStatus)}</span>
      </div>
    `;
  };
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
        <span>Coins Balance</span>
        <strong>${new Intl.NumberFormat("en-IN").format(balance)}</strong>
      </article>
      <article>
        <span>Total Orders</span>
        <strong>${orders.length}</strong>
      </article>
      <article>
        <span>Sell Requests</span>
        <strong>${sellRequestCount}</strong>
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
        <strong>${new Intl.NumberFormat("en-IN").format(balance)} <span class="coin-symbol large" aria-label="G&T Coins"></span></strong>
      </div>
      <a class="primary-button" href="#wallet">Open Wallet</a>
    </article>
    <article class="wide-card account-panel"><h3>Recent Sell Requests</h3>
      <div class="account-list">
        ${latestSellRequests.map(renderSellRequestMessage).join("") || "<span>No sell requests yet.</span>"}
      </div>
      <a class="secondary-button" href="#sell">Sell an Item</a>
    </article>
    <article class="wide-card account-panel"><h3>Recent Orders</h3>
      <div class="account-list">
        ${latestOrders.map(order => `<span>${escapeHtml(order.id)} • ${formatCoins(order.totalCoins || 0)} • ${escapeHtml(String(order.status || "").replaceAll("-", " "))}</span>`).join("") || "<span>No orders yet.</span>"}
      </div>
      <a class="secondary-button" href="#market">Browse Products</a>
    </article>
    <div class="account-logout-row">
      <button class="logout-outline-button" data-logout type="button">Logout</button>
    </div>
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
  const pendingRecharges = (adminDashboard.rechargeRequests || []).filter(item => item.status === "pending-admin-verification");
  const joinApplications = adminDashboard.joinApplications || [];
  const adminOrders = adminDashboard.orders || [];
  const maintenance = adminDashboard.maintenance || {};
  const adminProducts = adminDashboard.products || [];
  els.adminGrid.innerHTML = `
    <article><strong>Product Review</strong><span>${counts.sellRequests} sell requests in system</span></article>
    <article><strong>Inventory</strong><span>${counts.listedProducts} listed of ${counts.products} products</span></article>
    <article><strong>Orders</strong><span>${counts.orders} order records</span></article>
    <article><strong>Join Us</strong><span>${counts.joinApplications || joinApplications.length || 0} applications in system</span></article>
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
      <strong>Sell Item Requests</strong>
      <span>${adminSellRequests.length ? "Review seller uploads, schedule pickup, and credit coins after final check." : "No sell item requests yet."}</span>
      <div class="admin-list">
        ${adminSellRequests.map(item => `
          <div class="admin-row stacked">
            <span><strong>${escapeHtml(item.title || "Untitled item")}</strong> • ${escapeHtml(item.category || "category")} • ${escapeHtml(item.condition || "condition")} • ${escapeHtml(item.status || "upload-submitted")}</span>
            <span>${formatCoins(item.expectedCoins || 0)} expected • ${escapeHtml(item.city || "City not entered")} • ${escapeHtml(item.userEmail || item.userId || "User")}</span>
            <span>Seller contact: ${escapeHtml(item.sellerName || "Name not entered")} • ${escapeHtml(item.sellerPhone || "Phone not entered")}</span>
            <span>Pickup: ${escapeHtml(item.pickupAddress || "Address/landmark not entered")}</span>
            <span>Preferred pickup: ${escapeHtml(item.pickupDate || "Date not selected")} • ${escapeHtml(item.pickupTime || "Time not selected")}</span>
            <span>${escapeHtml(item.details?.note || "No seller note entered")}</span>
            <div class="admin-photo-grid">
              ${(item.photos || []).map((photo, index) => `
                <a href="${escapeHtml(photo)}" target="_blank" rel="noopener" aria-label="Open seller photo ${index + 1}">
                  <img src="${escapeHtml(photo)}" alt="Seller uploaded product photo ${index + 1}" loading="lazy" />
                </a>
              `).join("") || `<span>No photos uploaded</span>`}
            </div>
            ${["upload-submitted", "under-review", "pickup-scheduled"].includes(item.status || "upload-submitted") ? `
              <div class="admin-actions">
                <button class="secondary-button" data-sell-request-action="${item.id}" data-action="schedule" type="button">Schedule Pickup</button>
                <button class="primary-button" data-sell-request-action="${item.id}" data-action="accept" data-expected="${item.expectedCoins || 0}" type="button">Accept + Credit Coins</button>
                <button class="danger-button" data-sell-request-action="${item.id}" data-action="reject" type="button">Reject</button>
              </div>
            ` : ""}
          </div>
        `).join("")}
      </div>
    </article>
    <article class="wide-card">
      <strong>Pending UPI Recharges</strong>
      <span>${pendingRecharges.length ? "Verify payment in your UPI account before approving." : "No pending recharge requests."}</span>
      <div class="admin-list">
        ${pendingRecharges.map(item => `
          <div class="admin-row">
            <span>${item.id} • ${item.amount} ${coinMarkup()} • ${escapeHtml(item.userEmail || item.userId || "User")} • Ref: ${escapeHtml(item.upiReference || "not entered")}</span>
            <div class="admin-actions">
              <button class="primary-button" data-approve-recharge="${item.id}" type="button">Approve</button>
              <button class="danger-button" data-reject-recharge="${item.id}" type="button">Reject</button>
            </div>
          </div>
        `).join("")}
      </div>
    </article>
    <article class="wide-card">
      <strong>New Orders</strong>
      <span>${adminOrders.length ? "Customer and delivery details for placed orders." : "No order records yet."}</span>
      <div class="admin-list">
        ${adminOrders.map(order => {
          const details = order.deliveryDetails || {};
          const orderProducts = order.products || order.productIds || [];
          return `
            <div class="admin-row stacked">
              <span><strong>${escapeHtml(order.id)}</strong> • ${escapeHtml(String(order.status || "").replaceAll("-", " "))} • ${formatCoins(order.totalCoins || 0)} • Delivery: ${Number(order.deliveryCharge || 0) === 0 ? "Free" : `Rs.${order.deliveryCharge} COD`}</span>
              <span>${escapeHtml(details.name || "Name not entered")} • ${escapeHtml(details.phone || "Phone not entered")} • ${escapeHtml(order.userEmail || order.userId || "User")}</span>
              <span>${escapeHtml(details.address || "Address not entered")} • ${escapeHtml(details.city || order.deliveryCity || "City not entered")} ${details.pincode ? `• ${escapeHtml(details.pincode)}` : ""}</span>
              <span>${Array.isArray(orderProducts) ? orderProducts.map(item => escapeHtml(item.title || item)).join(", ") : ""}</span>
              <div class="admin-actions">
                <button class="secondary-button" data-order-status="${order.id}" data-next-status="confirmed" type="button">Confirm</button>
                <button class="secondary-button" data-order-status="${order.id}" data-next-status="packed" type="button">Packed</button>
                <button class="secondary-button" data-order-status="${order.id}" data-next-status="out-for-delivery" type="button">Out for Delivery</button>
                <button class="primary-button" data-order-status="${order.id}" data-next-status="delivered" type="button">Delivered</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </article>
    <article class="wide-card">
      <strong>Join Us Applications</strong>
      <span>${joinApplications.length ? "New applicants from the Join Us page." : "No Join Us applications yet."}</span>
      <div class="admin-list">
        ${joinApplications.map(item => `
          <div class="admin-row stacked">
            <span><strong>${escapeHtml(item.role || "Applicant")}</strong> • ${escapeHtml(item.city || "City not entered")} • ${escapeHtml(item.status || "submitted")}</span>
            <span>${escapeHtml(item.name || "Name not entered")} • ${escapeHtml(item.phone || "Phone not entered")}</span>
            <span>${escapeHtml(item.experience || "No experience note entered")}</span>
            ${item.status === "submitted" ? `
              <div class="admin-actions">
                <button class="primary-button" data-accept-application="${item.id}" type="button">Accept</button>
                <button class="secondary-button" data-reject-application="${item.id}" type="button">Reject</button>
              </div>
            ` : ""}
          </div>
        `).join("")}
      </div>
    </article>
    <article class="wide-card">
      <strong>UPI Settings</strong>
      <form class="inline-form" id="upiSettingsForm">
        <input name="merchantName" value="${upi.merchantName || "GIVE & TAKE"}" placeholder="Merchant name" />
        <input name="upiId" value="${upi.upiId || ""}" placeholder="yourupi@bank" />
        <input name="note" value="${upi.note || ""}" placeholder="Admin note" />
        <button class="primary-button" type="submit">Save UPI</button>
      </form>
    </article>
    <article class="wide-card">
      <strong>Add Product</strong>
      <span>Add real launch inventory after warehouse check. Product price must be in coins.</span>
      <form class="admin-product-form" id="adminProductForm">
        <input name="title" placeholder="Product name" required />
        <select name="category" required>
          ${categories.filter(category => category.id !== "mobiles").map(category => `<option value="${category.id}">${category.name}</option>`).join("")}
        </select>
        <input name="price" type="number" min="1" step="1" placeholder="Coin price" required />
        <select name="condition" required>
          <option>Excellent</option>
          <option selected>Good</option>
          <option>Fair</option>
          <option>Needs cleaning</option>
          <option>Needs repair</option>
        </select>
        <input name="quantity" type="number" min="1" step="1" value="1" placeholder="Quantity" />
        <input name="checks" class="span-2" placeholder="Checks, comma separated: Warehouse checked, Cleaned, Tested" />
        <button class="primary-button" type="submit">Add Product</button>
      </form>
    </article>
    <article class="wide-card">
      <strong>Products Manager</strong>
      <span>Manage product name, price, condition, listing status, and deletion.</span>
      <div class="admin-product-manager">
        ${adminProducts.map(product => `
          <div class="admin-product-row">
            <div>
              <strong>${escapeHtml(product.title || "Untitled product")}</strong>
              <span>${escapeHtml(product.category || "category")} • ${escapeHtml(product.condition || "condition")} • ${escapeHtml(product.status || "status")}</span>
              <span>${formatCoins(product.price || 0)}</span>
            </div>
            <div class="admin-product-actions">
              <button class="secondary-button" data-edit-product="${product.id}" data-edit-field="title" type="button">Edit Name</button>
              <button class="secondary-button" data-edit-product="${product.id}" data-edit-field="price" type="button">Edit Price</button>
              <button class="secondary-button" data-edit-product="${product.id}" data-edit-field="condition" type="button">Edit Condition</button>
              <button class="${product.status === "listed" ? "secondary-button" : "primary-button"}" data-product-status="${product.id}" data-next-status="${product.status === "listed" ? "unlisted" : "listed"}" type="button">
                ${product.status === "listed" ? "Unlist Product" : "List Product"}
              </button>
              <button class="danger-button" data-delete-product="${product.id}" type="button">Delete Product</button>
            </div>
          </div>
        `).join("") || `<p>No products available yet.</p>`}
      </div>
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
      <strong>${task.id}</strong>
      <span>${task.type.replaceAll("-", " ")} • ${task.city} • ${task.status}</span>
      <ul>${task.checklist.map(item => `<li>${item}</li>`).join("")}</ul>
      <button class="secondary-button full" data-task-complete="${task.id}" type="button">Mark Checked</button>
    </article>
  `).join("");
}

function renderCart() {
  if (!state.cart.length) {
    state.checkoutStep = "cart";
    const recommended = products
      .filter(product => product.status === "listed")
      .slice(0, 4);
    const cards = (recommended.length ? recommended : fallbackProducts.slice(0, 4)).map(product => `
      <article class="empty-cart-product">
        ${productVisual(product, "empty-cart-product-image")}
        <div>
          <strong>${escapeHtml(product.title || "Recommended item")}</strong>
          <span>${formatCoins(product.price || 0)}</span>
        </div>
        <button class="secondary-button" data-add="${product.id}" type="button">Add</button>
      </article>
    `).join("");
    els.cartView.innerHTML = `
      <section class="empty-cart">
        <div class="empty-cart-head">
          <div class="cart-title-wrap">
            <span class="cart-title-icon" aria-hidden="true">🛒</span>
            <h1 class="cart-title">My Cart</h1>
          </div>
          <span class="cart-summary">0 Items • 0 G&T Coins</span>
        </div>
        <div class="empty-cart-panel">
          <div class="empty-cart-illustration" aria-hidden="true">
            <svg viewBox="0 0 96 96" role="img">
              <path d="M24 27h9l6 34h32l7-24H39" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M43 73a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm25 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" fill="currentColor"/>
              <path d="M29 19c5-5 13-6 19-1 6-5 15-4 20 1" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".35"/>
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Start exploring products and exchange unused items using G&T Coins.</p>
          <a class="primary-button" href="#market">Browse Products</a>
        </div>
        <section class="cart-recommendations" aria-label="Recommended For You">
          <div class="cart-recommendations-head">
            <h2>Recommended For You</h2>
          </div>
          <div class="empty-cart-products">
            ${cards}
          </div>
        </section>
      </section>
    `;
    return;
  }
  const items = state.cart.map(id => products.find(product => product.id === id)).filter(Boolean);
  const total = items.reduce((sum, product) => sum + product.price * Number(state.cartQuantities[product.id] || 1), 0);
  const deliveryCharge = getDeliveryCharge(total);
  const hasEnoughCoins = (wallet.balance || 0) >= total;
  const delivery = state.deliveryDetails || {};
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
    els.cartView.innerHTML = `
      <form class="checkout-flow" id="checkoutForm">
        <section class="checkout-step">
          <h2>Confirm Order</h2>
          <div class="checkout-summary">
            <span>Items <strong>${items.reduce((sum, product) => sum + Number(state.cartQuantities[product.id] || 1), 0)}</strong></span>
            <span>Wallet balance <strong>${formatCoins(wallet.balance || 0)}</strong></span>
            <span>Order total <strong>${formatCoins(total)}</strong></span>
            <span>Delivery charge <strong>${deliveryCharge === 0 ? "Free" : `Rs.${deliveryCharge} COD`}</strong></span>
            <span>Deliver to <strong>${escapeHtml(delivery.name || "")} • ${escapeHtml(delivery.city || "")}</strong></span>
          </div>
          <div class="checkout-items">
            ${items.map(product => `<p><strong>${escapeHtml(product.title)}</strong><span>${Number(state.cartQuantities[product.id] || 1)} x ${formatCoins(product.price)}</span></p>`).join("")}
          </div>
          <div class="checkout-nav">
            <button class="secondary-button" data-checkout-step="delivery" type="button">Back</button>
            ${hasEnoughCoins ? `<button class="primary-button" type="submit">Confirm Order</button>` : `<a class="primary-button" href="#wallet">Recharge Coins</a>`}
          </div>
        </section>
      </form>
    `;
    return;
  }
  els.cartView.innerHTML = `
    <section class="checkout-flow">
      <h1 class="cart-title">My Cart</h1>
      <div class="cart-items">
        ${items.map(product => {
          const qty = Number(state.cartQuantities[product.id] || 1);
          return `
            <article class="cart-item">
              ${productVisual(product, "cart-item-image")}
              <div class="cart-item-body">
                <strong>${escapeHtml(compactProductTitle(product.title, 64))}</strong>
                <span>${escapeHtml(displayCategoryName(product.category))}</span>
                <div class="cart-price-row">
                  <label>Qty:
                    <select data-cart-qty="${product.id}">
                      ${[1, 2, 3, 4, 5].map(value => `<option value="${value}" ${qty === value ? "selected" : ""}>${value}</option>`).join("")}
                    </select>
                  </label>
                  <strong class="cart-line-price">${formatCoins(product.price * qty)}</strong>
                </div>
              </div>
              <div class="cart-item-actions">
                <button class="secondary-button" data-remove-cart="${product.id}" type="button">Remove</button>
                <button class="primary-button" data-cart-buy-now="${product.id}" type="button">Buy this now</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
      <div class="cart-total-bar">
        <span>Total</span>
        <strong>${formatCoins(total)}</strong>
        <small>Delivery: ${formatDeliveryCharge(total)}</small>
        <button class="primary-button" data-checkout-step="delivery" type="button">Place Order</button>
      </div>
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

function navigate(rawHash, shouldScroll = true) {
  const hash = (rawHash || location.hash || "#home").replace("#", "");
  const [route, value] = hash.split("/");
  state.route = route || "home";
  if (route === "category") state.category = value === "mobiles" ? "electronics" : value || "electronics";
  if (route === "product") state.productId = value || products[0].id;
  if (["account", "wallet", "orders", "cart", "sell"].includes(state.route) && !getCurrentUserId()) {
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
  renderProducts();
  renderProductDetail();
  renderCart();
  renderOrders();
  renderAccount();
  renderAdmin();
  renderPartnerTasks();
  renderAuthStatus();
  if (shouldScroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

function wireEvents() {
  document.body.addEventListener("click", async event => {
    const logout = event.target.closest("[data-logout]");
    if (logout) {
      if (customerToken) {
        try {
          await api("/api/auth/logout", { method: "POST", customer: true, body: JSON.stringify({}) });
        } catch {}
      }
      customerToken = "";
      localStorage.removeItem(CUSTOMER_TOKEN_KEY);
      currentUser = null;
      authRestorePending = false;
      document.documentElement.classList.remove("has-customer-token");
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

    const category = event.target.closest("[data-category]");
    if (category) location.hash = `category/${category.dataset.category}`;

    const product = event.target.closest("[data-product]");
    if (product) location.hash = `product/${product.dataset.product}`;

    const add = event.target.closest("[data-add]");
    if (add) {
      addProductToCart(add.dataset.add);
    }

    const addStay = event.target.closest("[data-add-stay]");
    if (addStay) {
      addProductToCart(addStay.dataset.addStay);
    }

    const buyNow = event.target.closest("[data-buy-now]");
    if (buyNow) {
      state.cart = [buyNow.dataset.buyNow];
      state.cartQuantities = { [buyNow.dataset.buyNow]: 1 };
      state.checkoutStep = "cart";
      renderAuthStatus();
      location.hash = "cart";
    }

    const removeCart = event.target.closest("[data-remove-cart]");
    if (removeCart) {
      state.cart = state.cart.filter(id => id !== removeCart.dataset.removeCart);
      delete state.cartQuantities[removeCart.dataset.removeCart];
      state.checkoutStep = "cart";
      renderCart();
      renderAuthStatus();
    }

    const cartBuyNow = event.target.closest("[data-cart-buy-now]");
    if (cartBuyNow) {
      state.cart = [cartBuyNow.dataset.cartBuyNow];
      state.cartQuantities = { [cartBuyNow.dataset.cartBuyNow]: 1 };
      state.checkoutStep = "delivery";
      renderCart();
      renderAuthStatus();
    }

    const checkoutStep = event.target.closest("[data-checkout-step]");
    if (checkoutStep) {
      state.checkoutStep = checkoutStep.dataset.checkoutStep;
      renderCart();
    }

    const route = event.target.closest("[data-route]");
    if (route) location.hash = route.dataset.route;

    const recharge = event.target.closest("[data-recharge]");
    if (recharge) {
      if (!requireCustomerLogin()) return;
      const upi = platformConfig.integrations?.payments?.upi || {};
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

    const orderStatus = event.target.closest("[data-order-status]");
    if (orderStatus) {
      try {
        await api(`/api/admin/orders/${orderStatus.dataset.orderStatus}`, {
          method: "PATCH",
          admin: true,
          body: JSON.stringify({ status: orderStatus.dataset.nextStatus }),
        });
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        renderAdmin();
        alert("Order status updated.");
      } catch (error) {
        alert(error.message);
      }
    }

    const taskComplete = event.target.closest("[data-task-complete]");
    if (taskComplete) {
      try {
        const data = await api(`/api/partner/tasks/${taskComplete.dataset.taskComplete}`, {
          method: "PATCH",
          admin: true,
          body: JSON.stringify({ status: "doorstep-checked", proof: { checklist: "completed in partner panel" } }),
        });
        partnerTasks = partnerTasks.map(task => task.id === data.task.id ? data.task : task);
        renderPartnerTasks();
      } catch (error) {
        alert(error.message);
      }
    }

    const approveRecharge = event.target.closest("[data-approve-recharge]");
    if (approveRecharge) {
      try {
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
        alert(error.message);
      }
    }

    const rejectRecharge = event.target.closest("[data-reject-recharge]");
    if (rejectRecharge) {
      if (!confirm("Reject this recharge request? Coins will not be credited.")) return;
      try {
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
        alert(error.message);
      }
    }

    const sellRequestAction = event.target.closest("[data-sell-request-action]");
    if (sellRequestAction) {
      const action = sellRequestAction.dataset.action;
      const requestId = sellRequestAction.dataset.sellRequestAction;
      let finalCoins = sellRequestAction.dataset.expected || "0";
      let pickupNote = "";
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
      if (action === "reject" && !confirm("Reject this sell item request?")) return;
      try {
        const data = await api(`/api/admin/sell-requests/${requestId}/${action}`, {
          method: "POST",
          admin: true,
          body: JSON.stringify({ finalCoins, pickupNote }),
        });
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        await refreshCurrentWallet();
        renderAll();
        alert(`Sell request updated: ${data.sellRequest.id}`);
      } catch (error) {
        alert(error.message);
      }
    }

    const acceptApplication = event.target.closest("[data-accept-application]");
    if (acceptApplication) {
      try {
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
        alert(error.message);
      }
    }

    const rejectApplication = event.target.closest("[data-reject-application]");
    if (rejectApplication) {
      try {
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
        alert(error.message);
      }
    }

    const maintenanceToggle = event.target.closest("[data-maintenance-toggle]");
    if (maintenanceToggle) {
      try {
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
        renderAdmin();
        alert(nextFull ? "Maintenance mode is ON." : "Maintenance mode is OFF.");
      } catch (error) {
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
      } else {
        const text = String(nextValue).trim();
        if (!text) {
          alert("Value cannot be empty.");
          return;
        }
        payload[field] = text;
      }

      try {
        await api(`/api/admin/products/${productId}`, {
          method: "PATCH",
          admin: true,
          body: JSON.stringify(payload),
        });
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
      renderCart();
      renderAuthStatus();
    }
  });
  [els.categoryFilter, els.cityFilter, els.sortFilter].forEach(el => el.addEventListener("change", renderProducts));
  els.searchInput.addEventListener("input", event => {
    state.query = event.target.value;
    if (state.route !== "market") location.hash = "market";
    renderProducts();
  });
  els.sellCategory.addEventListener("change", renderFormFields);
  document.getElementById("sellForm").addEventListener("submit", async event => {
    event.preventDefault();
    if (!requireCustomerLogin()) return;
    const sellForm = event.currentTarget;
    const form = new FormData(sellForm);
    try {
      const photos = await collectSellPhotos(sellForm.elements.photos?.files);
      const data = await api("/api/sell-requests", {
        method: "POST",
        body: JSON.stringify({
          userId: getCurrentUserId(),
          userEmail: currentUser?.email || "",
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
      renderFormFields();
    } catch (error) {
      alert(error.message);
    }
  });
  document.getElementById("joinForm").addEventListener("submit", async event => {
    event.preventDefault();
    const joinForm = event.currentTarget;
    const form = new FormData(joinForm);
    try {
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
    }
  });
  document.body.addEventListener("submit", async event => {
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
          }),
        });
        customerToken = data.token;
        localStorage.setItem(CUSTOMER_TOKEN_KEY, customerToken);
        currentUser = data.user || null;
        authRestorePending = false;
        document.documentElement.classList.add("has-customer-token");
        wallet = normalizeWallet(data.wallet);
        await loadBackendData();
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
      const form = new FormData(event.target);
      try {
        const data = await api("/api/admin/login", {
          method: "POST",
          body: JSON.stringify({ password: form.get("password") }),
        });
        adminToken = data.token;
        localStorage.setItem(ADMIN_TOKEN_KEY, adminToken);
        await loadProtectedData();
        renderAdmin();
        renderPartnerTasks();
        alert("Admin login successful.");
      } catch (error) {
        alert(error.message);
      }
      return;
    }
    if (event.target.id === "deliveryDetailsForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      state.deliveryDetails = {
        name: form.get("name"),
        phone: form.get("phone"),
        address: form.get("address"),
        city: form.get("city"),
        pincode: form.get("pincode"),
        note: form.get("note"),
      };
      state.checkoutStep = "review";
      renderCart();
      return;
    }
    if (event.target.id === "checkoutForm") {
      event.preventDefault();
      if (!requireCustomerLogin()) return;
      const items = state.cart.map(id => products.find(product => product.id === id)).filter(Boolean);
      const total = items.reduce((sum, product) => sum + product.price * Number(state.cartQuantities[product.id] || 1), 0);
      if ((wallet.balance || 0) < total) {
        alert("Wallet has insufficient coins. Please recharge before confirming order.");
        location.hash = "wallet";
        return;
      }
      const deliveryDetails = state.deliveryDetails || {};
      const deliveryCharge = getDeliveryCharge(total);
      const productIds = state.cart.flatMap(id => Array(Number(state.cartQuantities[id] || 1)).fill(id));
      try {
        const data = await api("/api/orders", {
          method: "POST",
          body: JSON.stringify({
            userId: getCurrentUserId(),
            userEmail: currentUser?.email || "",
            productIds,
            city: deliveryDetails.city,
            deliveryChargeMode: "cod-rupees",
            deliveryCharge,
            deliveryDetails,
          }),
        });
        wallet = normalizeWallet(data.wallet);
        orders.unshift(data.order);
        state.cart = [];
        state.cartQuantities = {};
        state.checkoutStep = "cart";
        state.deliveryDetails = {};
        await refreshCurrentWallet();
        renderAll();
        location.hash = "orders";
        alert(`Order confirmed: ${data.order.id}`);
      } catch (error) {
        alert(error.message);
      }
      return;
    }
    if (event.target.id === "adminProductForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      const checks = String(form.get("checks") || "")
        .split(",")
        .map(check => check.trim())
        .filter(Boolean);
      try {
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
            checks: checks.length ? checks : ["Warehouse checked"],
          }),
        });
        event.target.reset();
        await loadData();
        await loadProtectedData();
        renderAll();
        alert("Product added to marketplace.");
      } catch (error) {
        alert(error.message);
      }
      return;
    }
    if (event.target.id === "upiReferenceForm") {
      event.preventDefault();
      if (!requireCustomerLogin()) return;
      const form = new FormData(event.target);
      try {
        const data = await api("/api/wallet/recharge", {
          method: "POST",
          body: JSON.stringify({
            userId: getCurrentUserId(),
            userEmail: currentUser?.email || "",
            amount: Number(state.rechargeAmount),
            method: "UPI",
            upiReference: form.get("upiReference"),
          }),
        });
        wallet = normalizeWallet(data.wallet);
        state.rechargeAmount = null;
        await refreshCurrentWallet();
        renderAll();
        alert(`Recharge request submitted: ${data.rechargeRequest.id}. Coins will be credited after admin verifies payment.`);
      } catch (error) {
        alert(error.message);
      }
      return;
    }
    if (event.target.id !== "upiSettingsForm") return;
    event.preventDefault();
    const form = new FormData(event.target);
    try {
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
    }
  });
  document.getElementById("langToggle").addEventListener("click", () => {
    alert("English is active for Phase 1. Hindi support can be connected in the next build pass.");
  });
}

async function init() {
  await loadAuthUser();
  renderAll();
  wireEvents();
  navigate();
  await loadBackendData();
  renderAll();
}

init();
