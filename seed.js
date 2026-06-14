const categories = [
  { id: "mobiles", name: "Mobiles", text: "Phones with IMEI, lock, battery, display, and diagnostic checks." },
  { id: "electronics", name: "Electronics", text: "Laptops, tablets, headphones, speakers, and smart devices." },
  { id: "books", name: "Books", text: "Study books, course sets, exam material, and novels." },
  { id: "furniture", name: "Furniture", text: "Tables, chairs, storage, and useful home furniture." },
  { id: "fashion", name: "Clothes & Shoes", text: "Clean, verified wearable items and accessories." },
  { id: "home", name: "Home & Kitchen", text: "Useful household, kitchen, decor, and appliance items." },
  { id: "bags", name: "Bags", text: "Backpacks, handbags, luggage, and office bags." },
  { id: "toys", name: "Toys & More", text: "Toys, hobby items, bundles, and low-value useful items." }
];

const products = [
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
    category: "furniture",
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
    category: "furniture",
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
    category: "furniture",
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
    category: "furniture",
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
    category: "furniture",
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
    category: "furniture",
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
    category: "furniture",
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

const homeKitchenScreenshotProducts = [
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
    "images": [
      "https://deodap.in/cdn/shop/files/8UR2OC61Qc.jpg?v=1776856123",
      "https://deodap.in/cdn/shop/files/cGZvzJmy2v.jpg?v=1776856122",
      "https://deodap.in/cdn/shop/files/ZjNrbIEQcp.jpg?v=1776856123",
      "https://deodap.in/cdn/shop/files/r1uQyM6ouR.jpg?v=1776856122",
      "https://deodap.in/cdn/shop/files/rstfooRWYL.jpg?v=1776856122",
      "https://deodap.in/cdn/shop/files/isOKf5AKu9.jpg?v=1776856123",
      "https://deodap.in/cdn/shop/files/zGP5Ev6ML5.jpg?v=1776856123",
      "https://deodap.in/cdn/shop/files/jJcBTskzav.jpg?v=1776856123"
    ],
    "newest": 1000,
    "supplierUrl": "https://deodap.in/products/glass-tumbler-with-straw-and-lid-portable-juice-coffee-cup-1"
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
    "images": [
      "https://deodap.in/cdn/shop/files/01_cf89d252-05a8-4b5f-b488-649a8e5ca30d.jpg?v=1769171900",
      "https://deodap.in/cdn/shop/files/a80bd7fd-d28e-49b1-bda5-2aef37991292_0b371092-e46d-4324-9879-5c8471a0da48.jpg?v=1769171900",
      "https://deodap.in/cdn/shop/files/04_9eecd7b6-4ff7-4dd4-beb0-47f0dab5e6c1.jpg?v=1769171900",
      "https://deodap.in/cdn/shop/files/02_9bfe83ed-0412-46c6-8f13-525d8c3a6ce6.jpg?v=1769171900",
      "https://deodap.in/cdn/shop/files/05_d03d965c-6894-425d-9b4f-f964c0e5e704.jpg?v=1769171900",
      "https://deodap.in/cdn/shop/files/03_d1d18de1-60c6-49d5-b708-1e26165743da.jpg?v=1769171900",
      "https://deodap.in/cdn/shop/files/2b9b3759-47bb-4674-abc4-6f7babe123b0_df38a105-9ae8-49dc-b9db-5a4f86db0da8.jpg?v=1769171900"
    ],
    "newest": 999,
    "supplierUrl": "https://deodap.in/products/professional-grade-stainless-steel-vegetable-cleaver-knife-1-pc-01"
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
    "images": [
      "https://deodap.in/cdn/shop/files/Hook-1.jpg?v=1776842596",
      "https://deodap.in/cdn/shop/files/Hook-9.jpg?v=1776842596",
      "https://deodap.in/cdn/shop/files/Hook-3.jpg?v=1776842596",
      "https://deodap.in/cdn/shop/files/Hook-7.jpg?v=1776842595",
      "https://deodap.in/cdn/shop/files/Hook-5.jpg?v=1776842596",
      "https://deodap.in/cdn/shop/files/Hook-6.jpg?v=1776842595",
      "https://deodap.in/cdn/shop/files/Hook-2.jpg?v=1776842596",
      "https://deodap.in/cdn/shop/files/Hook-4.jpg?v=1776842595",
      "https://deodap.in/cdn/shop/files/Hook-8.jpg?v=1776842595"
    ],
    "newest": 998,
    "supplierUrl": "https://deodap.in/products/transparent-self-adhesive-wall-hook-1-pc"
  },
  {
    "id": "hk04",
    "title": "Leakproof 450ml Glass Water Bottle For Outdoor & Sports",
    "price": 69,
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
    "images": [
      "https://deodap.in/cdn/shop/files/01_f0158a81-c2ef-481d-9430-311382fede6b.jpg?v=1737615940",
      "https://deodap.in/cdn/shop/files/212.jpg?v=1737615940",
      "https://deodap.in/cdn/shop/files/02_af5abeef-e1fa-4846-8086-0e059449d1db.jpg?v=1737615940",
      "https://deodap.in/cdn/shop/files/03_fee37e73-78c2-4fea-9b77-da8bf021981d.jpg?v=1737615940",
      "https://deodap.in/cdn/shop/files/05_d10998c8-aa65-4de9-a30b-5461702b55db.jpg?v=1737615940",
      "https://deodap.in/cdn/shop/files/04_d74e4bcd-e7a1-4e01-a8e9-9530a89b6794.jpg?v=1737615940",
      "https://deodap.in/cdn/shop/files/10e6d356-1bec-4f00-91b8-94de26cc92c5.jpg?v=1737615940"
    ],
    "newest": 997,
    "supplierUrl": "https://deodap.in/products/leakproof-glass-water-bottle-450ml"
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
    "images": [
      "https://deodap.in/cdn/shop/files/Lightpanda-WOSKU-01.jpg?v=1774331864",
      "https://deodap.in/cdn/shop/files/21255.jpg?v=1774525594",
      "https://deodap.in/cdn/shop/files/Lightpanda-03.jpg?v=1774525594",
      "https://deodap.in/cdn/shop/files/Lightpanda-06.jpg?v=1774525594",
      "https://deodap.in/cdn/shop/files/Lightpanda-04.jpg?v=1774525594",
      "https://deodap.in/cdn/shop/files/Lightpanda-07.jpg?v=1774525594",
      "https://deodap.in/cdn/shop/files/Lightpanda-05.jpg?v=1774525594",
      "https://deodap.in/cdn/shop/files/Lightpanda-02.jpg?v=1774525594",
      "https://deodap.in/cdn/shop/files/Lightpanda-live.jpg?v=1774525594"
    ],
    "newest": 996,
    "supplierUrl": "https://deodap.in/products/cute-mini-panda-night-light-lamp-1-pc"
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
    "images": [
      "https://deodap.in/cdn/shop/products/5a03f578a2ef5509bf8a2b70-1-large.jpg?v=1750851930",
      "https://deodap.in/cdn/shop/products/1186.jpg?v=1750851930",
      "https://deodap.in/cdn/shop/products/510MEXzOmHL._SL1001.jpg?v=1750851930",
      "https://deodap.in/cdn/shop/products/5b1514a8ec5ead7d6a8dc3ae-2-large.jpg?v=1750851930",
      "https://deodap.in/cdn/shop/products/5de923d33be6b63ac911b58a-9-large.jpg?v=1750851930",
      "https://deodap.in/cdn/shop/products/5de923d33be6b63ac911b58a-12-large.jpg?v=1750851930",
      "https://deodap.in/cdn/shop/files/a434d2f0-ecaa-4cd2-92ae-74b112c95dd7.jpg?v=1750851930"
    ],
    "newest": 995,
    "supplierUrl": "https://deodap.in/products/1186-premium-coconut-opener-tool-driller-with-comfortable-grip"
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
    "images": [
      "https://deodap.in/cdn/shop/files/3.jpg?v=1761747759",
      "https://deodap.in/cdn/shop/files/46.png?v=1761747759",
      "https://deodap.in/cdn/shop/files/47.png?v=1761747759",
      "https://deodap.in/cdn/shop/files/48.png?v=1761747759",
      "https://deodap.in/cdn/shop/files/49_51c19603-75a6-432c-969d-3bb55fab282d.png?v=1761747759",
      "https://deodap.in/cdn/shop/files/50_5ac2dc5e-a361-4bee-adc9-6bcc5213e19d.png?v=1761747759",
      "https://deodap.in/cdn/shop/files/02_8ef5907c-424d-43b5-8963-e412fd176126.jpg?v=1761747759",
      "https://deodap.in/cdn/shop/files/04_470e54a3-2de3-457f-9ca1-1ae47946c094.jpg?v=1761747759",
      "https://deodap.in/cdn/shop/files/05_48c8e84c-55a5-4779-8d58-66c790a35cfb.jpg?v=1761747759",
      "https://deodap.in/cdn/shop/files/06_ecc02eb7-88ba-4bc6-a1b8-fb9123663230.jpg?v=1761747759",
      "https://deodap.in/cdn/shop/files/5f9c14cb-07a6-42f9-8c5b-49b92167a7dc.jpg?v=1761747759"
    ],
    "newest": 994,
    "supplierUrl": "https://deodap.in/products/disposable-shower-caps"
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
    "images": [
      "https://deodap.in/cdn/shop/files/01_9cea5e9c-9214-4fd3-bb07-a4f9f80d7f81.jpg?v=1737617976",
      "https://deodap.in/cdn/shop/files/135656.jpg?v=1737617976",
      "https://deodap.in/cdn/shop/files/04_e0589165-571a-4bc8-8b2d-3ce15631cfd7.jpg?v=1737617976",
      "https://deodap.in/cdn/shop/files/02_b252b38a-5da8-48c2-8751-7de4301aa0d7.jpg?v=1737617976",
      "https://deodap.in/cdn/shop/files/05_9285baec-da6a-4e3b-b0e4-408d21daa678.jpg?v=1737617977",
      "https://deodap.in/cdn/shop/files/03_6bef138f-d27b-4800-8262-3670aa29f5a8.jpg?v=1737617977",
      "https://deodap.in/cdn/shop/files/20620b5f-feb0-4cf1-910c-6f0d6d21eab0.jpg?v=1737617977"
    ],
    "newest": 993,
    "supplierUrl": "https://deodap.in/products/13630-face-massage-ice-roller-1pc"
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
    "images": [
      "https://deodap.in/cdn/shop/files/02_dae2a0b9-783b-4eff-918f-ee75d33b1f6f.jpg?v=1771313070",
      "https://deodap.in/cdn/shop/files/01_6ebdc4aa-3e0c-48e1-b5fd-f6129aa23083.jpg?v=1771313070",
      "https://deodap.in/cdn/shop/files/04_6fb93fdc-5fa5-4daa-9af7-e7bddf6e5336.jpg?v=1771313070",
      "https://deodap.in/cdn/shop/files/05_57218cdd-3edc-4101-9267-28536f92108b.jpg?v=1771409448",
      "https://deodap.in/cdn/shop/files/03_2f2b6a02-81c3-4278-837a-228bcb91fa0d.jpg?v=1771409448",
      "https://deodap.in/cdn/shop/files/06_0ed4e97b-8659-48ab-b24b-95a5663cbd09.jpg?v=1771313070",
      "https://deodap.in/cdn/shop/files/07_62299ff7-8cfe-4e66-969d-c9f305bbc632.jpg?v=1771313070"
    ],
    "newest": 992,
    "supplierUrl": "https://deodap.in/products/multi-purpose-plastic-wall-mounted-mobile-charging-holder-set-4-pc"
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
    "images": [
      "https://deodap.in/cdn/shop/files/ru5JONiHAO.jpg?v=1777380985",
      "https://deodap.in/cdn/shop/files/JtXfgCprhe.jpg?v=1777380985",
      "https://deodap.in/cdn/shop/files/SiQn6o2O3V.jpg?v=1777380985",
      "https://deodap.in/cdn/shop/files/rzM80Y2CYz.jpg?v=1777380985",
      "https://deodap.in/cdn/shop/files/E04DN4Cy5o.png?v=1777380986",
      "https://deodap.in/cdn/shop/files/geTqbVueyw.jpg?v=1777380985"
    ],
    "newest": 991,
    "supplierUrl": "https://deodap.in/products/ocean-insulated-water-jug-with-tap-4500ml-pc-bpa-free-hot-cold-dispenser"
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
    "images": [
      "https://deodap.in/cdn/shop/files/21df1db2-13f1-4cae-b097-4646355bad51.jpg?v=1737617649",
      "https://deodap.in/cdn/shop/files/06_7c8ce855-6fa0-4f6d-a0c0-a47cde595c08.jpg?v=1737617649",
      "https://deodap.in/cdn/shop/files/07_be0a9d16-3cf2-4ef9-9774-89ee6dabfa39.jpg?v=1737617649",
      "https://deodap.in/cdn/shop/files/01_508b819c-2e5f-4d4c-8d00-b3e22dc625cd.jpg?v=1737617650",
      "https://deodap.in/cdn/shop/files/03_2da30c2f-766f-49e2-b9f5-d395b05f1518.jpg?v=1737617650",
      "https://deodap.in/cdn/shop/files/04_ff7a0c82-0e14-479e-9121-cc27803fc09e.jpg?v=1737617650",
      "https://deodap.in/cdn/shop/files/05_1a0dd2a7-d36c-4300-b447-7004e52863d4.jpg?v=1737617650",
      "https://deodap.in/cdn/shop/files/08_a7bf0907-096d-41fe-916c-24147ead7de9.jpg?v=1737617650",
      "https://deodap.in/cdn/shop/files/09_9f5a7536-711a-430d-9511-63c7262344df.jpg?v=1737617651",
      "https://deodap.in/cdn/shop/files/2c6ffaf1-efe6-457a-8c9d-cfa37d2af8bf.jpg?v=1737617651"
    ],
    "newest": 990,
    "supplierUrl": "https://deodap.in/products/12038_750w_electric_sandwich_maker"
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
    "images": [
      "https://deodap.in/cdn/shop/products/1_fee79a3d-7b47-4f56-b72e-0b0e22e9a831.jpg?v=1737631031",
      "https://deodap.in/cdn/shop/products/0082.jpg?v=1737631031",
      "https://deodap.in/cdn/shop/products/5_71b9a005-a073-4f15-80c8-890f10ae2b09.jpg?v=1737631031",
      "https://deodap.in/cdn/shop/products/4_2a16d5e8-cacc-4d5c-af0f-6396a85bdf29.jpg?v=1737631031",
      "https://deodap.in/cdn/shop/products/04_6.jpg?v=1737631032",
      "https://deodap.in/cdn/shop/products/3_bee3e193-2584-4c94-b211-f3133bc315c1.jpg?v=1737631032",
      "https://deodap.in/cdn/shop/products/2_252a2795-cb35-4604-a53a-75dee9aa81e3.jpg?v=1737631032",
      "https://deodap.in/cdn/shop/products/8697cfac-1638-4013-8a33-05670d0921b5_9a0ebcac-10ed-4aa7-9951-2abb16c72b89.jpg?v=1737631032"
    ],
    "newest": 989,
    "supplierUrl": "https://deodap.in/products/082-smokeless-electric-indoor-barbecue-grill-2000w"
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
    "images": [
      "https://deodap.in/cdn/shop/products/1_980f9b7a-5676-4c1d-a756-d7bcef131eda.jpg?v=1737629483",
      "https://deodap.in/cdn/shop/products/0178.jpg?v=1737629483",
      "https://deodap.in/cdn/shop/products/IMG-20200706-WA0156.jpg?v=1737629483",
      "https://deodap.in/cdn/shop/products/Untitled-1copy.jpg?v=1737629483",
      "https://deodap.in/cdn/shop/products/61iCn2en2GL._AC_SL1500.jpg?v=1737629483",
      "https://deodap.in/cdn/shop/products/40263d6f-d3c3-469b-a009-4f2263f0a51d.jpg?v=1737629483"
    ],
    "newest": 988,
    "supplierUrl": "https://deodap.in/products/178-kitchen-food-processor-chop-n-churn"
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
    "images": [
      "https://deodap.in/cdn/shop/files/02_e2f6d4fc-c53f-4005-a6af-bf547936d74f.jpg?v=1751263917",
      "https://deodap.in/cdn/shop/files/37c2ddd4-7f09-4d49-96e0-8ea49f558d18_522b81d8-9033-4539-950c-36d066eae59f.jpg?v=1751263917",
      "https://deodap.in/cdn/shop/files/06_99939d45-f10d-4410-8600-21297c47e5c4.jpg?v=1751263917",
      "https://deodap.in/cdn/shop/files/03_39f86d62-d8bd-4b6c-8b09-5209fca1d840.jpg?v=1751263917",
      "https://deodap.in/cdn/shop/files/04_ca3023f5-5a62-40d9-a4a7-ce0516a4f8a6.jpg?v=1751263917",
      "https://deodap.in/cdn/shop/files/05_998ee18f-62a7-47ce-aee0-7f01092cd342.jpg?v=1751263917",
      "https://deodap.in/cdn/shop/files/02_9bcc0d17-7ade-4aa4-8251-06758836726a.jpg?v=1751263917",
      "https://deodap.in/cdn/shop/files/272da2bc-6c7e-4cd0-8933-3f8bd22caed1_fcb8e295-d416-4913-9734-7ae4c236952b.jpg?v=1743836581"
    ],
    "newest": 987,
    "supplierUrl": "https://deodap.in/products/ultrasonic-jewllery-cleaner-ultrasonic-cleaning-machine-portable-jewellery-cleaning-for-jewellery-ring-silver-retainer-glasses-watches-coins"
  },
  {
    "id": "hk15",
    "title": "Stainless Steel Round Roaster Grill With Wooden Handle - 7.6x13 In",
    "price": 70,
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
    "images": [
      "https://deodap.in/cdn/shop/files/SteelJaliRoasterGrill-WOSKU-01.jpg?v=1774850440",
      "https://deodap.in/cdn/shop/files/sku_8c9064de-4649-4a73-b5e6-9265c11d12b9.jpg?v=1774850440",
      "https://deodap.in/cdn/shop/files/SteelJaliRoasterGrill-05.jpg?v=1774947892",
      "https://deodap.in/cdn/shop/files/SteelJaliRoasterGrill-04.jpg?v=1774947892",
      "https://deodap.in/cdn/shop/files/SteelJaliRoasterGrill-02.jpg?v=1774947892",
      "https://deodap.in/cdn/shop/files/SteelJaliRoasterGrill-size.jpg?v=1774850479",
      "https://deodap.in/cdn/shop/files/SteelJaliRoasterGrill-03.jpg?v=1774850479",
      "https://deodap.in/cdn/shop/files/SteelJaliRoasterGrill-live.jpg?v=1774850479"
    ],
    "newest": 986,
    "supplierUrl": "https://deodap.in/products/2085-kitchen-round-stainless-steel-roaster-papad-jali-barbecue-grill-with-wooden-handle"
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
    "images": [
      "https://deodap.in/cdn/shop/files/0060_power_free_blender.jpg?v=1745572967",
      "https://deodap.in/cdn/shop/products/0060.jpg?v=1745572967",
      "https://deodap.in/cdn/shop/products/4_1024x1024_414ad6c1-b865-4035-bb9b-193cbe1b969f.jpg?v=1745572967",
      "https://deodap.in/cdn/shop/files/0060_power_free_blender_068a2398-cda4-4718-b9ca-5fd025a406ea.jpg?v=1765950442",
      "https://deodap.in/cdn/shop/products/as5d5as1d6.jpg?v=1765950442",
      "https://deodap.in/cdn/shop/products/1_1024x1024_8929ed6f-2ae9-49b0-9879-83c7bd4b6a06.jpg?v=1765950442",
      "https://deodap.in/cdn/shop/products/04_1.jpg?v=1765950442",
      "https://deodap.in/cdn/shop/products/2_1024x1024_a2c93c64-f1e4-49c1-8ef1-b6b0b84b8205.jpg?v=1765950442",
      "https://deodap.in/cdn/shop/products/51yvsEuhUgS._SL1500.jpg?v=1765950442",
      "https://deodap.in/cdn/shop/products/45.jpg?v=1765950442",
      "https://deodap.in/cdn/shop/files/44ca8443-6a07-4b77-b197-a9202ed5282c.jpg?v=1765950442"
    ],
    "newest": 985,
    "supplierUrl": "https://deodap.in/products/060-power-free-blender"
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
    "images": [
      "https://deodap.in/cdn/shop/files/01_605b09bc-2596-43ba-879e-cb674ebb53fc.jpg?v=1745040067",
      "https://deodap.in/cdn/shop/files/sku_4d377bed-2a93-429a-bedb-4dd9e4ae1eb4.jpg?v=1745040067",
      "https://deodap.in/cdn/shop/files/02_802c513d-67a5-420b-aa58-994b3d1a9015.jpg?v=1745040067",
      "https://deodap.in/cdn/shop/files/03_4d9053d2-4ccb-4cc6-9b34-24ea8efecb24.jpg?v=1745040068",
      "https://deodap.in/cdn/shop/files/05_5a593bc2-e9c9-4aa6-80a3-900c84150bc4.jpg?v=1745040068",
      "https://deodap.in/cdn/shop/files/04_a8046927-5603-4068-862b-dd807a88653e.jpg?v=1745040068",
      "https://deodap.in/cdn/shop/files/8612937e-511f-47a7-8c68-2a4634f4803a.jpg?v=1745040068"
    ],
    "newest": 984,
    "supplierUrl": "https://deodap.in/products/11452_power_x_chopper_500ml_pxc"
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
    "images": [
      "https://deodap.in/cdn/shop/files/CFRsOR7K1Q.jpg?v=1773662418",
      "https://deodap.in/cdn/shop/files/ioY8XXEeis.jpg?v=1773662417",
      "https://deodap.in/cdn/shop/files/icqVz0ttGV.jpg?v=1773662417",
      "https://deodap.in/cdn/shop/files/NK3OqcjSuJ.jpg?v=1773662419",
      "https://deodap.in/cdn/shop/files/b83lWeFhqs.jpg?v=1773662416",
      "https://deodap.in/cdn/shop/files/zejiOvgKA1.jpg?v=1773662416",
      "https://deodap.in/cdn/shop/files/Ip4soJpoF4.jpg?v=1773662416"
    ],
    "newest": 983,
    "supplierUrl": "https://deodap.in/products/stainless-steel-water-dispenser-with-tap-carry-handle-hot-and-cold-beverage-storage"
  }
];

const electronicsScreenshotProducts = [
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/01_cce4cffc-ef30-4cc8-bf82-e685db1de0a5.jpg?v=1772454352",
    "images": [
      "https://deodap.in/cdn/shop/files/01_cce4cffc-ef30-4cc8-bf82-e685db1de0a5.jpg?v=1772454352",
      "https://deodap.in/cdn/shop/files/08_dee8da98-e2d5-43a2-b7f4-71f6f5013f56.jpg?v=1772454352",
      "https://deodap.in/cdn/shop/files/04_4ebf55ee-451c-41eb-9624-829c620cff05.jpg?v=1772454352",
      "https://deodap.in/cdn/shop/files/05_ff0f0af2-11b9-4fc3-9f3d-3cc3eacc4932.jpg?v=1772454352",
      "https://deodap.in/cdn/shop/files/06_53234026-e2f5-41cd-b93c-f40465e67ac0.jpg?v=1772454352",
      "https://deodap.in/cdn/shop/files/09_fe31607b-7db6-4288-a605-63f01f1ae137.jpg?v=1772454352",
      "https://deodap.in/cdn/shop/files/03_c5ebbd39-2e7c-46ca-9401-4ae55ba72212.jpg?v=1772454352",
      "https://deodap.in/cdn/shop/files/07_647b60bd-7e22-4567-8516-b007df009c04.jpg?v=1772454338"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 900,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/virtual-reality-3d-vr-headset-1-pc"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/LCDWritingTabletPencilBox-WOSKU-1.jpg?v=1773997288",
    "images": [
      "https://deodap.in/cdn/shop/files/LCDWritingTabletPencilBox-WOSKU-1.jpg?v=1773997288",
      "https://deodap.in/cdn/shop/files/sku_9ff584bf-d35b-4e28-b301-4cb9df3d06f2.jpg?v=1773997288",
      "https://deodap.in/cdn/shop/files/LCDWritingTabletPencilBox-03.jpg?v=1773997288",
      "https://deodap.in/cdn/shop/files/LCDWritingTabletPencilBox-04.jpg?v=1774082616",
      "https://deodap.in/cdn/shop/files/LCDWritingTabletPencilBox-02.jpg?v=1774082616",
      "https://deodap.in/cdn/shop/files/LCDWritingTabletPencilBox-size.jpg?v=1773997288",
      "https://deodap.in/cdn/shop/files/LCDWritingTabletPencilBox-05.jpg?v=1773997288",
      "https://deodap.in/cdn/shop/files/LCDWritingTabletPencilBox-06.jpg?v=1773997288",
      "https://deodap.in/cdn/shop/files/LCDWritingTabletPencilBox-live.jpg?v=1773997288"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 899,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/lcd-writing-tablet-pencil-case-with-calculator-1-pc"
  },
  {
    "id": "el03",
    "title": "Camera & Mobile Tripod",
    "category": "electronics",
    "city": "Gonda",
    "price": 234,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 674,
    "sold": 22,
    "badges": [
      "DeoDap Product"
    ],
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/products/4_98b27e7c-6714-4df9-ae02-ef694e6d5901.jpg?v=1737629155",
    "images": [
      "https://deodap.in/cdn/shop/products/4_98b27e7c-6714-4df9-ae02-ef694e6d5901.jpg?v=1737629155",
      "https://deodap.in/cdn/shop/products/0280.jpg?v=1737629155",
      "https://deodap.in/cdn/shop/products/6_311778c0-8ef1-45f0-b762-0cdc9bc3ebfc.jpg?v=1737629156",
      "https://deodap.in/cdn/shop/products/2_90725a48-1a98-46c2-93a0-2166d47e0839.jpg?v=1737629156",
      "https://deodap.in/cdn/shop/products/3_878969e5-94d8-4a61-9301-fed495eb2e2f.jpg?v=1737629156",
      "https://deodap.in/cdn/shop/products/263f0039-7de4-4353-b831-8900c14ad91d.jpg?v=1737629156"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 898,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/0280-camera-mobile-tripod"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/61l-OM9K72L._SL1500_e0a450d7-a3ba-4cc1-a8a9-bbf4b20321fd.jpg?v=1737616248",
    "images": [
      "https://deodap.in/cdn/shop/files/61l-OM9K72L._SL1500_e0a450d7-a3ba-4cc1-a8a9-bbf4b20321fd.jpg?v=1737616248",
      "https://deodap.in/cdn/shop/files/848c87c9-66cb-4083-a768-6a5157973f15_8d4437f6-ae0d-44ca-8684-79f579b13783.jpg?v=1737616248",
      "https://deodap.in/cdn/shop/files/61bETCz97EL._SL1500_9bd9974d-add3-46f3-b799-a51d346773de.jpg?v=1737616248",
      "https://deodap.in/cdn/shop/files/51teWfAPAfL._SL1500_dcdb6e1c-3238-4ac7-ac36-84126b84f394.jpg?v=1737616248",
      "https://deodap.in/cdn/shop/files/61t7ynmcCaL._SL1500_f9832631-6c98-4240-832d-8703fbf84ad7.jpg?v=1737616248",
      "https://deodap.in/cdn/shop/files/51RjvxLupcL._SL1500_e1fa4ec5-c752-40a4-8704-e459ce25941e.jpg?v=1737616248",
      "https://deodap.in/cdn/shop/files/41e7JXvqxFL._SL1500_b81c00fb-e689-4a94-a557-d16aa59e7d44.jpg?v=1737616248",
      "https://deodap.in/cdn/shop/files/61B9ITP4k2L._SL1500_1fbeca9d-cde7-437c-9a55-0487008f8ef8.jpg?v=1737616249",
      "https://deodap.in/cdn/shop/files/71xVU2mzGdL._SL1500_f4b747a5-46be-4b6c-b268-5e666d37fddb.jpg?v=1737616249",
      "https://deodap.in/cdn/shop/files/f5fd5600-b917-4c5c-a79d-d46a322e5eb5_a72fc1e8-d890-4e7e-91fb-ae2c6552bf24.jpg?v=1737616249"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 897,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/pocket-mini-printer-mobile-phone-bluetooth-connection-wireless-mini-thermal-printer-with-android-or-ios-app-for-pictures-portable-smart-printer-contains-1-rolls-thermal-paper-with-fast-paper-output-for-photo-image-01"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/products/02_b7309ff7-09cb-4669-9b0f-11c16348b529.jpg?v=1737631801",
    "images": [
      "https://deodap.in/cdn/shop/products/02_b7309ff7-09cb-4669-9b0f-11c16348b529.jpg?v=1737631801",
      "https://deodap.in/cdn/shop/products/11_baad0773-8408-46ec-8ab4-143c8975601b.jpg?v=1737631801",
      "https://deodap.in/cdn/shop/products/03_2d074d85-4f6a-420f-a136-e53a72786c6a.jpg?v=1737631801",
      "https://deodap.in/cdn/shop/products/10_bc5fc31e-1615-47ce-bdbc-432568234860.jpg?v=1737631801",
      "https://deodap.in/cdn/shop/products/04_824243f7-3d41-4a37-a835-d6872ccfc16d.jpg?v=1737631801",
      "https://deodap.in/cdn/shop/products/08_94f74602-723e-4282-bfec-5f96da186f56.jpg?v=1737631802",
      "https://deodap.in/cdn/shop/products/1_122e26c6-d903-4e02-9fe0-ed1f6699dc01.jpg?v=1737631802",
      "https://deodap.in/cdn/shop/products/07_5739c900-ce3c-4a09-b669-51d34d168d4c.jpg?v=1737631802",
      "https://deodap.in/cdn/shop/products/06_0441b143-8522-433a-8620-575557d2f34f.jpg?v=1737631802",
      "https://deodap.in/cdn/shop/products/05_c8630864-040a-4da4-ae6a-2e6a015dda74.jpg?v=1737631802",
      "https://deodap.in/cdn/shop/products/09_40f0918d-2c14-4032-89c8-63a9e4af90f5.jpg?v=1737631802",
      "https://deodap.in/cdn/shop/products/70058dec-2542-46e2-8f3b-da2e2a538924_233433e9-c4a8-4dd6-b746-fdba25cef432.jpg?v=1737631802"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 896,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/0367-usb-vibration-full-body-massager"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/02_dae2a0b9-783b-4eff-918f-ee75d33b1f6f.jpg?v=1771313070",
    "images": [
      "https://deodap.in/cdn/shop/files/02_dae2a0b9-783b-4eff-918f-ee75d33b1f6f.jpg?v=1771313070",
      "https://deodap.in/cdn/shop/files/01_6ebdc4aa-3e0c-48e1-b5fd-f6129aa23083.jpg?v=1771313070",
      "https://deodap.in/cdn/shop/files/04_6fb93fdc-5fa5-4daa-9af7-e7bddf6e5336.jpg?v=1771313070",
      "https://deodap.in/cdn/shop/files/05_57218cdd-3edc-4101-9267-28536f92108b.jpg?v=1771409448",
      "https://deodap.in/cdn/shop/files/03_2f2b6a02-81c3-4278-837a-228bcb91fa0d.jpg?v=1771409448",
      "https://deodap.in/cdn/shop/files/06_0ed4e97b-8659-48ab-b24b-95a5663cbd09.jpg?v=1771313070",
      "https://deodap.in/cdn/shop/files/07_62299ff7-8cfe-4e66-969d-c9f305bbc632.jpg?v=1771313070"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 895,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/multi-purpose-plastic-wall-mounted-mobile-charging-holder-set-4-pc"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_main.jpg?v=1778563092",
    "images": [
      "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_main.jpg?v=1778563092",
      "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_sku.jpg?v=1778563092",
      "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_kid_use.jpg?v=1778563093",
      "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_adult_use.jpg?v=1778563092",
      "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_white_bg.jpg?v=1778563092",
      "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_dimension.jpg?v=1778563092",
      "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_composite.jpg?v=1778563092",
      "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_counter.jpg?v=1778563092",
      "https://deodap.in/cdn/shop/files/6217_electric_toothbrush_blister_pack.jpg?v=1778563092"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 894,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/electric-toothbrush-with-extra-brush-head-2-aa-batteries-for-kids-adults-1-pc"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/products/03_6b0a2503-8b86-48ce-9c70-b363cdc1fcf8.jpg?v=1737629208",
    "images": [
      "https://deodap.in/cdn/shop/products/03_6b0a2503-8b86-48ce-9c70-b363cdc1fcf8.jpg?v=1737629208",
      "https://deodap.in/cdn/shop/products/01_f4160401-2e36-4f1e-9cf9-4e3fb7228382.jpg?v=1737629208",
      "https://deodap.in/cdn/shop/products/04_c9e765b2-f1b1-4c5f-8e8c-28bc6417f456.jpg?v=1737629208",
      "https://deodap.in/cdn/shop/products/07_d01dba7a-d121-461d-83a6-acd14b56a45a.jpg?v=1737629208",
      "https://deodap.in/cdn/shop/products/06_ba8411ff-d416-4417-b6f9-a3c42ccb96fd.jpg?v=1737629208",
      "https://deodap.in/cdn/shop/products/02_cfb55325-75d7-4d81-bac9-207f1724f21c.jpg?v=1737629208",
      "https://deodap.in/cdn/shop/products/05_13c50294-e6b3-4d3a-b3c1-934f1aa5a5fa.jpg?v=1737629208",
      "https://deodap.in/cdn/shop/products/9c5cde44-6273-46e0-b2f3-5ac97c5bd13b.jpg?v=1737629208"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 893,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/generic-electronic-kitchen-digital-weighing-scale-multipurpose-white-10-kg"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/08_41f723d0-703e-479d-a3ee-6269447cd192.jpg?v=1737625784",
    "images": [
      "https://deodap.in/cdn/shop/files/08_41f723d0-703e-479d-a3ee-6269447cd192.jpg?v=1737625784",
      "https://deodap.in/cdn/shop/files/6935b335-c0c9-4e7d-9158-c78cc2135935.jpg?v=1737625784",
      "https://deodap.in/cdn/shop/files/03_923abcbf-7148-4bcf-ba07-4ee313429cd7.jpg?v=1737625784",
      "https://deodap.in/cdn/shop/files/07_196b32e4-d85e-415e-937c-bc811f226da6.jpg?v=1737625784",
      "https://deodap.in/cdn/shop/files/02_33341811-1edc-4ad7-ae22-d01eca4a5c8c.jpg?v=1737625784",
      "https://deodap.in/cdn/shop/files/06_5cbd25bc-72c7-4ca5-82d0-7e3c494ff2b4.jpg?v=1737625785",
      "https://deodap.in/cdn/shop/files/04_cd21450b-0122-4f3b-b9f0-20705b97ef72.jpg?v=1737625785",
      "https://deodap.in/cdn/shop/files/05_5c1dd5ec-2339-440b-b1ae-1489428e46ec.jpg?v=1737625785",
      "https://deodap.in/cdn/shop/files/2185721e-eb55-413e-a9e5-09e0d2793fd0_81fb9b68-3b9f-4e92-b122-c5498526f2be.jpg?v=1769580624"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 892,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/12564-solar-wall-lights-lamp-outdoor-wireless-dusk-to-dawn-porch-lights-fixture-solar-wall-lantern-with-3-modes-motion-sensor-waterproof-exterior-lighting-with-clear-panel-1-pc"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/Crystal-ball-night-light-01.jpg?v=1765255387",
    "images": [
      "https://deodap.in/cdn/shop/files/Crystal-ball-night-light-01.jpg?v=1765255387",
      "https://deodap.in/cdn/shop/files/79375026-78dd-4c5f-abd5-5bef9990ad0a.jpg?v=1765255387",
      "https://deodap.in/cdn/shop/files/Crystal-ball-night-light-02.jpg?v=1765512770",
      "https://deodap.in/cdn/shop/files/9920_mahadev_crystal_ball_1pc.png?v=1765512770",
      "https://deodap.in/cdn/shop/files/Crystal-ball-night-light-05.jpg?v=1765512770",
      "https://deodap.in/cdn/shop/files/Crystal-ball-night-light-03.jpg?v=1765512770",
      "https://deodap.in/cdn/shop/files/Crystal-ball-night-light-06.jpg?v=1765512770",
      "https://deodap.in/cdn/shop/files/Crystal-ball-night-light-04.jpg?v=1765512770",
      "https://deodap.in/cdn/shop/files/Crystal-ball-night-light-08.jpg?v=1765512770"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 891,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/mahadev-3d-crystal-ball-night-ligh"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/3dGlassGanpatiji-WOSKU-01.png?v=1765255573",
    "images": [
      "https://deodap.in/cdn/shop/files/3dGlassGanpatiji-WOSKU-01.png?v=1765255573",
      "https://deodap.in/cdn/shop/files/3889892-12Pc-Ganpatibapacrystalball-Av-Sv.jpg?v=1765255573",
      "https://deodap.in/cdn/shop/files/3dGlassGanpatiji-size.png?v=1765255573",
      "https://deodap.in/cdn/shop/files/3dGlassGanpatiji-02.png?v=1765255573",
      "https://deodap.in/cdn/shop/files/3dGlassGanpatiji-04.png?v=1765255573",
      "https://deodap.in/cdn/shop/files/3dGlassGanpatiji-03.png?v=1765255573",
      "https://deodap.in/cdn/shop/files/3dGlassGanpatiji-05.png?v=1765255573",
      "https://deodap.in/cdn/shop/files/3dGlassGanpatiji-06.png?v=1765255573",
      "https://deodap.in/cdn/shop/files/3dGlassGanpatiji-live.png?v=1765255573"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 890,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/ganpati-bapa-3d-crystal-ball-night-light-with-led-illumination-1-pc"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/21638-01-no-sku_0f25e2d9-89d2-4b49-b406-d9fd861c6022.jpg?v=1781094445",
    "images": [
      "https://deodap.in/cdn/shop/files/21638-01-no-sku_0f25e2d9-89d2-4b49-b406-d9fd861c6022.jpg?v=1781094445",
      "https://deodap.in/cdn/shop/files/21638-02-sku_7a5485c3-4095-495f-ab69-f38dec6c80da.jpg?v=1781094445",
      "https://deodap.in/cdn/shop/files/21638-03-product_4820654f-fc35-46b9-a5e3-771a517a7eb0.jpg?v=1781094445",
      "https://deodap.in/cdn/shop/files/21638-05-white-bg_3dfa0d7e-839d-46ea-a7ac-f8723418c412.jpg?v=1781094445",
      "https://deodap.in/cdn/shop/files/21638-08-live_1a87c060-00cd-4d14-86e9-ee575f69f708.jpg?v=1781094445",
      "https://deodap.in/cdn/shop/files/21638-06-size_e5fddfe0-acb7-416c-8cb8-f639d734c4af.jpg?v=1781094445",
      "https://deodap.in/cdn/shop/files/21638-07-live_e361da93-14a7-4900-84ae-7ffe16446c53.jpg?v=1781094445",
      "https://deodap.in/cdn/shop/files/21638-09-live_613323b4-24d0-495a-9a13-69a88d79875d.jpg?v=1781094445",
      "https://deodap.in/cdn/shop/files/21638-04-pack_dd111ada-f641-46e0-bee2-6ebb2e0f7baf.jpg?v=1781094445"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 889,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/mini-handheld-rechargeable-personal-fan-with-stand-portable-usb-desk-fan-1-pc"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/6XoILWxXri.png?v=1777121723",
    "images": [
      "https://deodap.in/cdn/shop/files/6XoILWxXri.png?v=1777121723",
      "https://deodap.in/cdn/shop/files/SvM1cA6YMF.jpg?v=1777121722",
      "https://deodap.in/cdn/shop/files/Y3Ne2ztbBC.jpg?v=1777121723",
      "https://deodap.in/cdn/shop/files/Xkpc86mnhG.jpg?v=1777121722",
      "https://deodap.in/cdn/shop/files/CVLQNbjWhz.jpg?v=1777121722",
      "https://deodap.in/cdn/shop/files/dYPbrxy6Xw.jpg?v=1777121722",
      "https://deodap.in/cdn/shop/files/S1QnDiEjDH.jpg?v=1777121722",
      "https://deodap.in/cdn/shop/files/C8AwbpGIOA.jpg?v=1777121722"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 888,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/led-desk-lamp-with-pen-holder-and-mobile-stand-organizer"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/047_8cf82c0c-6c94-4363-bed8-210568b05ddb.jpg?v=1750845063",
    "images": [
      "https://deodap.in/cdn/shop/files/047_8cf82c0c-6c94-4363-bed8-210568b05ddb.jpg?v=1750845063",
      "https://deodap.in/cdn/shop/files/c052bc06-a55b-4f6a-9253-5facc10d4dfe.jpg?v=1750845063",
      "https://deodap.in/cdn/shop/files/ce242d00-7b8b-4ae0-bb2f-cfb4ee49f04f.jpg?v=1750845063",
      "https://deodap.in/cdn/shop/files/05_0993f32a-48ca-4705-9f56-204e42eb2093.jpg?v=1737622545",
      "https://deodap.in/cdn/shop/files/03_c713c9b9-f184-4787-bf61-d6fdafc31cca.jpg?v=1737622545",
      "https://deodap.in/cdn/shop/files/02_f5ae7031-9913-47de-92b7-c9a59d8c5c2f.jpg?v=1737622546",
      "https://deodap.in/cdn/shop/files/06_7e7a1ac0-1dba-4e7c-9245-4d25a92d8bb5.jpg?v=1737622546",
      "https://deodap.in/cdn/shop/files/a530c092-af0d-4732-9af1-720d57bad4f8.jpg?v=1737622546"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 887,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/17781_50mm_magnifying_glass_lens_1pc"
  },
  {
    "id": "el15",
    "title": "Mobile Holder Astronaut Phone Stand Planet Creative Fun 3D Design (1 Pc / Mix Design)",
    "category": "electronics",
    "city": "Gonda",
    "price": 87,
    "condition": "New",
    "source": "GIVE & TAKE Verified",
    "views": 578,
    "sold": 10,
    "badges": [
      "DeoDap Product"
    ],
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/01_8d5c4877-a713-4aef-b859-ac071f6bf21d.jpg?v=1750928757",
    "images": [
      "https://deodap.in/cdn/shop/files/01_8d5c4877-a713-4aef-b859-ac071f6bf21d.jpg?v=1750928757",
      "https://deodap.in/cdn/shop/files/sku_c5b23dd3-6f9f-4f8c-a0be-a7b63e85ae49.jpg?v=1750928757",
      "https://deodap.in/cdn/shop/files/03_b4a709fd-eb50-42b8-8d0a-dcafca5a2bd3.jpg?v=1750928757",
      "https://deodap.in/cdn/shop/files/05_8dcc0a34-068b-45d1-9ee5-0c0f1848cbfc.jpg?v=1750928757",
      "https://deodap.in/cdn/shop/files/01_25f632d9-60d7-49e2-a5fb-b084720baafd.jpg?v=1750928757",
      "https://deodap.in/cdn/shop/files/02_0e9d0a0e-bb31-43dd-89ca-fbcaae2ffe7f.jpg?v=1738934432",
      "https://deodap.in/cdn/shop/files/04_ea05c3a8-8963-4dfc-bafe-25762217c00b.jpg?v=1738934432",
      "https://deodap.in/cdn/shop/files/43c2bd7b-35ec-4394-babc-a1ea4f3cb837.jpg?v=1738934432",
      "https://deodap.in/cdn/shop/files/57bb5bb3-1a3b-4369-9678-10736249055a.jpg?v=1738934432",
      "https://deodap.in/cdn/shop/files/f78a394d-a248-4777-9b66-5a59eff52262.jpg?v=1738934432",
      "https://deodap.in/cdn/shop/files/64d34113-197d-433d-8bc2-445e605c62dc.jpg?v=1738934432"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 886,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/3d_astronaut_mobile_phone_holder_13751"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/products/34_e0cd29ea-b437-464e-ace7-08b492160bfc.jpg?v=1737634031",
    "images": [
      "https://deodap.in/cdn/shop/products/34_e0cd29ea-b437-464e-ace7-08b492160bfc.jpg?v=1737634031",
      "https://deodap.in/cdn/shop/files/63c810c3-1844-45c2-92d9-e32d3780719b.jpg?v=1737634031",
      "https://deodap.in/cdn/shop/products/32_303d7e1a-aeba-4a30-ad51-26868671e874.jpg?v=1737634031",
      "https://deodap.in/cdn/shop/products/35_b4490476-edfe-442c-b686-804526e6a54b.jpg?v=1737634032",
      "https://deodap.in/cdn/shop/products/36_bc67a672-c78b-406e-8cf5-501667ac1cff.jpg?v=1737634032",
      "https://deodap.in/cdn/shop/products/33_f85b7a1a-eed2-42ff-abe3-279ab1892a8f.jpg?v=1737634032",
      "https://deodap.in/cdn/shop/files/29003dc8-36e8-4cf0-9285-8ee1fc902c92.jpg?v=1737634032"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 885,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/6498-multi-purpose-wall-holder-stand-for-charging-mobile-just-fit-in-socket-and-hang-yellow"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/9814-01-no-sku_b1115cb2-0e70-420d-b92d-be75164ea35a.jpg?v=1780663846",
    "images": [
      "https://deodap.in/cdn/shop/files/9814-01-no-sku_b1115cb2-0e70-420d-b92d-be75164ea35a.jpg?v=1780663846",
      "https://deodap.in/cdn/shop/files/9814-02-sku_687e297c-5ede-4761-a206-d1b0595645de.jpg?v=1780663846",
      "https://deodap.in/cdn/shop/files/9814-03-product_970cf354-1003-4c98-a6d0-3c90f6766425.jpg?v=1780663846",
      "https://deodap.in/cdn/shop/files/9814-04-product_72c02b49-eefe-4f60-bb57-894d1e7a11bb.jpg?v=1780663846",
      "https://deodap.in/cdn/shop/files/9814-05-white-bg_18ab8b4d-516a-4fd3-84dd-dd3478834d57.jpg?v=1780663846",
      "https://deodap.in/cdn/shop/files/9814-06-size_47850743-6116-4547-a5e6-dd0a465b6f6e.jpg?v=1780663846",
      "https://deodap.in/cdn/shop/files/9814-07-live_f093d09c-2767-40ed-a91a-c3c3df72efee.jpg?v=1780663846",
      "https://deodap.in/cdn/shop/files/9814-08-live_c863ca47-74e7-4dde-a9fb-35da1be5ca5b.jpg?v=1780663846",
      "https://deodap.in/cdn/shop/files/9814-09-live_3441e873-f24f-4849-9e77-560d66eb157e.jpg?v=1780663846"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 884,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/mini-flexible-tripod-stand-for-mobile-phone-with-clip-holder-octopus-legs-1-pc"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/03_d5a8c020-9e05-4eec-95de-d3222dcdf89e.jpg?v=1751289031",
    "images": [
      "https://deodap.in/cdn/shop/files/03_d5a8c020-9e05-4eec-95de-d3222dcdf89e.jpg?v=1751289031",
      "https://deodap.in/cdn/shop/files/8be7b0b6-664b-48a7-9a39-9c0237b50c89.jpg?v=1751289031",
      "https://deodap.in/cdn/shop/files/02_e61c3c23-ab30-48ce-95d6-8d35aa9f8eb3.jpg?v=1751289031",
      "https://deodap.in/cdn/shop/files/04_0413506f-4440-4b39-afbf-13d8a8fdac82.jpg?v=1751289031",
      "https://deodap.in/cdn/shop/files/05_d492fd57-0edb-426e-b148-148888a9b6fe.jpg?v=1751289031",
      "https://deodap.in/cdn/shop/files/01_3d786499-c6fe-4a99-8bb9-cde712c285aa.jpg?v=1751289031",
      "https://deodap.in/cdn/shop/files/af055a81-fede-4457-a39d-47eff68d1fee.jpg?v=1737620958"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 883,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/wireless-bluetooth-earbuds-earbuds-with-mic"
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
    "checks": [
      "GIVE & TAKE verified"
    ],
    "artA": "#d3f4e9",
    "artB": "#3a6e63",
    "imageUrl": "https://deodap.in/cdn/shop/files/02_80783d0a-96ed-4ee0-9112-4beb21cb3996.jpg?v=1744344099",
    "images": [
      "https://deodap.in/cdn/shop/files/02_80783d0a-96ed-4ee0-9112-4beb21cb3996.jpg?v=1744344099",
      "https://deodap.in/cdn/shop/files/WhatsAppImage2025-04-10at16.48.19.jpg?v=1744344099",
      "https://deodap.in/cdn/shop/files/04_185e0d02-d085-4def-b9b7-dc0ebed96ae9.jpg?v=1744344099",
      "https://deodap.in/cdn/shop/files/05_3b65e72e-1800-47bb-a6a0-bced04523975.jpg?v=1744344099",
      "https://deodap.in/cdn/shop/files/06_ccc20f08-f6b5-43f1-91ce-b803f0a2e32a.jpg?v=1744344099",
      "https://deodap.in/cdn/shop/files/01_a17942e4-d3e8-429a-947e-ead434462c71.jpg?v=1744344099",
      "https://deodap.in/cdn/shop/files/03_bf547e2d-1f8b-4115-8d6d-e4dbedbf33be.jpg?v=1744344099",
      "https://deodap.in/cdn/shop/files/5414a717-36a0-405f-a6c8-a76a63c14f0c.jpg?v=1744344099"
    ],
    "status": "listed",
    "quantity": 1,
    "newest": 882,
    "returnWindowHours": 48,
    "owner": "give-and-take",
    "sourceType": "screenshot-supplier-inventory",
    "supplierUrl": "https://deodap.in/products/wireless-over-ear-bluetooth-headphones-zw-053"
  }
];

function createSeed() {
  return {
    meta: {
      name: "GIVE & TAKE",
      phase: "phase-2-local-backend",
      coinValue: 1,
      coinRechargeMinimum: 50,
      coinRechargeStep: 50,
      catalogVersion: "home-electronics-deodap-gallery-2026-06-14",
      serviceCities: ["Lucknow", "Ayodhya", "Gonda"],
      checkoutCurrency: "coins-only",
      updatedAt: new Date().toISOString()
    },
    maintenance: {
      full: false,
      pausedFeatures: [],
      message: "GIVE & TAKE is under maintenance. We will be back soon.",
      expectedReturn: ""
    },
    categories,
    products: [...homeKitchenScreenshotProducts, ...electronicsScreenshotProducts, ...products.filter(product => !["home", "electronics"].includes(product.category))],
    users: [],
    wallets: {},
    sellRequests: [],
    partnerTasks: [],
    orders: [],
    joinApplications: [],
    rechargeRequests: [],
    returns: [],
    integrations: {
      payments: {
        preferred: "UPI only",
        allowedMethods: ["UPI"],
        status: "manual-upi-verification",
        upi: {
          merchantName: "GIVE & TAKE",
          upiId: "",
          note: "Add your UPI ID from the admin panel before public launch."
        },
        notes: "Only UPI is enabled. Recharge requests stay pending until admin verifies the UPI payment."
      },
      delivery: {
        ownPartnerPanel: "active-local-system",
        externalDeliveryApps: "disabled",
        shiprocket: "disabled",
        delhivery: "disabled",
        porter: "disabled",
        notes: "No third-party delivery API is connected. Pickup, verification, and delivery are handled by the internal GIVE & TAKE partner panel."
      }
    }
  };
}

module.exports = { createSeed };
