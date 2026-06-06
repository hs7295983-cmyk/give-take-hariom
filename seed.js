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

const productRows = [
  ["p1", "Samsung Galaxy M32", "mobiles", "Lucknow", 8200, "Good", "GIVE & TAKE Verified", 240, 18, ["Tested", "Return Eligible"], ["IMEI matched", "Battery normal", "Minor body marks"], "#bde7ff", "#30586c"],
  ["p2", "iPhone XR 64GB", "mobiles", "Ayodhya", 11800, "Fair", "Refurbished", 380, 21, ["Tested", "Cleaned"], ["Face ID working", "Battery fair", "Local display noted"], "#f5d3cb", "#6b4f64"],
  ["p3", "Redmi Note 11", "mobiles", "Gonda", 6900, "Good", "Collected Item", 210, 15, ["Verified", "Return Eligible"], ["Charger included", "Camera checked", "No screen crack"], "#ffd28c", "#be6b37"],
  ["p4", "Lenovo ThinkPad", "electronics", "Lucknow", 18500, "Good", "GIVE & TAKE Verified", 510, 9, ["Tested", "Cleaned"], ["Keyboard working", "Battery backup checked", "Charger included"], "#c7d2fe", "#243b73"],
  ["p5", "Boat Bluetooth Speaker", "electronics", "Ayodhya", 1450, "Like New", "Open Box", 150, 28, ["Tested"], ["Sound checked", "Charging checked", "Cable included"], "#c9f7e1", "#256b52"],
  ["p6", "Sony Headphones", "electronics", "Gonda", 2200, "Good", "Collected Item", 175, 11, ["Tested", "Cleaned"], ["Mic checked", "Cushions cleaned", "Bluetooth working"], "#f6e7a8", "#4f6f8f"],
  ["p7", "Class 12 PCM Book Set", "books", "Lucknow", 780, "Good", "Collected Item", 98, 8, ["Quality Checked"], ["No missing pages", "Some highlighting", "Latest useful edition"], "#ffe3a3", "#977b35"],
  ["p8", "UPSC Starter Books", "books", "Ayodhya", 1250, "Good", "Collected Item", 310, 22, ["Quality Checked"], ["Set complete", "Clean pages", "Minor notes"], "#d8f1f0", "#3b7270"],
  ["p9", "Engineering Drawing Book", "books", "Gonda", 350, "Fair", "Collected Item", 80, 6, ["Best Value"], ["Usable pages", "Older edition", "Low-cost pick"], "#ead7ff", "#59476f"],
  ["p10", "Study Table", "furniture", "Lucknow", 3100, "Good", "GIVE & TAKE Verified", 165, 5, ["Cleaned"], ["Stable", "Minor scratches", "Pickup checked"], "#d5f0c0", "#607b35"],
  ["p11", "Office Chair", "furniture", "Ayodhya", 2400, "Fair", "Collected Item", 145, 7, ["Cleaned"], ["Wheels working", "Fabric cleaned", "Armrest marks"], "#cde7ff", "#33628c"],
  ["p12", "Small Wooden Shelf", "furniture", "Gonda", 1600, "Good", "Collected Item", 90, 4, ["Cleaned"], ["Strong body", "Polished", "No major crack"], "#f4d6b3", "#8d5930"],
  ["p13", "Denim Jacket", "fashion", "Lucknow", 950, "Like New", "Collected Item", 330, 19, ["Cleaned", "Return Eligible"], ["Size M", "No stains", "Washed"], "#b9d7f5", "#2f4d73"],
  ["p14", "Sports Shoes UK 8", "fashion", "Ayodhya", 1250, "Good", "GIVE & TAKE Verified", 270, 13, ["Cleaned"], ["Sole checked", "No tear", "Minor wear"], "#d7f5c2", "#54783e"],
  ["p15", "Cotton Kurta Set", "fashion", "Gonda", 700, "Good", "Collected Item", 120, 6, ["Cleaned"], ["Size L", "Fresh cleaned", "No defect"], "#ffd7d2", "#9b4d43"],
  ["p16", "Mixer Grinder", "home", "Lucknow", 2600, "Good", "Tested Appliance", 240, 10, ["Tested", "Cleaned"], ["Motor checked", "Jar included", "Safe wiring"], "#ffe4a8", "#a66a22"],
  ["p17", "Table Lamp", "home", "Ayodhya", 650, "Good", "Collected Item", 92, 14, ["Tested"], ["Switch working", "Cable checked", "Bulb included"], "#fff1b8", "#68602a"],
  ["p18", "Kitchen Storage Set", "home", "Gonda", 520, "Like New", "Open Box", 76, 9, ["Cleaned"], ["Set complete", "No cracks", "Hygiene checked"], "#d3f4e9", "#3a6e63"],
  ["p19", "College Backpack", "bags", "Lucknow", 850, "Good", "Collected Item", 220, 18, ["Cleaned"], ["Zips working", "No tear", "Washed"], "#d7e0ff", "#445690"],
  ["p20", "Travel Duffel Bag", "bags", "Ayodhya", 1150, "Good", "Collected Item", 160, 7, ["Cleaned"], ["Handles strong", "Zips checked", "Minor marks"], "#ecd6ba", "#8a603a"],
  ["p21", "Office Laptop Bag", "bags", "Gonda", 700, "Fair", "Collected Item", 105, 5, ["Best Value"], ["Usable", "Zip checked", "Visible wear"], "#cfe7dd", "#446a5a"],
  ["p22", "Kids Toy Bundle", "toys", "Lucknow", 450, "Good", "Low-Value Bundle", 190, 14, ["Cleaned"], ["Pieces checked", "Cleaned", "Bundle value"], "#ffe1ef", "#91536d"],
  ["p23", "Cricket Bat", "toys", "Ayodhya", 900, "Fair", "Collected Item", 125, 8, ["Quality Checked"], ["Usable grip", "Body marks", "No crack"], "#f5dda6", "#7b5d2e"],
  ["p24", "Bluetooth Keyboard", "electronics", "Lucknow", 1250, "Like New", "Open Box", 280, 17, ["Tested"], ["Keys working", "Bluetooth checked", "Battery included"], "#dce9ff", "#425e9a"],
  ["p25", "Single Pillow Pair", "home", "Gonda", 120, "Good", "Donation/Bundle Eligible", 65, 3, ["Cleaned"], ["Low-value item", "Bundle pickup suggested", "Hygiene checked"], "#f2e1c6", "#8f734b"]
];

const products = productRows.map(([id, title, category, city, price, condition, source, views, sold, badges, checks, artA, artB], index) => ({
  id,
  title,
  category,
  city,
  price,
  condition,
  source,
  views,
  sold,
  badges,
  checks,
  artA,
  artB,
  status: "listed",
  quantity: 1,
  newest: productRows.length - index,
  returnWindowHours: 48,
  owner: "give-and-take",
  sourceType: "collected-inventory"
}));

function createSeed() {
  return {
    meta: {
      name: "GIVE & TAKE",
      phase: "phase-2-local-backend",
      coinValue: 1,
      coinRechargeMinimum: 50,
      coinRechargeStep: 50,
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
    products,
    users: [
      {
        id: "user-demo",
        phone: "9999999999",
        email: "demo@giveandtake.local",
        city: "Lucknow",
        profileComplete: false,
        role: "customer"
      }
    ],
    wallets: {
      "user-demo": {
        balance: 2450,
        ledger: [
          { id: "l1", type: "credit", amount: 1200, reason: "Item accepted after warehouse check", createdAt: new Date().toISOString() },
          { id: "l2", type: "debit", amount: 650, reason: "Product purchase", createdAt: new Date().toISOString() },
          { id: "l3", type: "credit", amount: 500, reason: "UPI coin recharge", createdAt: new Date().toISOString() },
          { id: "l4", type: "debit", amount: 50, reason: "Delivery paid in coins", createdAt: new Date().toISOString() },
          { id: "l5", type: "credit", amount: 5, reason: "Referral reward", createdAt: new Date().toISOString() }
        ]
      }
    },
    sellRequests: [
      {
        id: "GT-S1001",
        userId: "user-demo",
        city: "Lucknow",
        category: "mobiles",
        title: "Demo phone upload",
        expectedCoins: 7000,
        status: "warehouse-final-check",
        timeline: ["upload-submitted", "under-review", "pickup-scheduled", "doorstep-verified", "product-collected", "warehouse-final-check"],
        createdAt: new Date().toISOString()
      }
    ],
    partnerTasks: [
      {
        id: "GT-P229",
        type: "pickup-verification",
        city: "Lucknow",
        category: "mobiles",
        status: "assigned",
        checklist: ["Verify IMEI", "Run speaker test", "Run microphone test", "Check display", "Capture photos", "Capture short video", "OTP handover"]
      },
      {
        id: "GT-P230",
        type: "bundle-pickup",
        city: "Gonda",
        category: "books",
        status: "assigned",
        checklist: ["Check each item", "Capture photos", "Mark accepted or rejected", "Collect OTP"]
      }
    ],
    orders: [
      {
        id: "GT-1042",
        userId: "user-demo",
        productIds: ["p5"],
        totalCoins: 1450,
        status: "coins-confirmed",
        timeline: ["order-placed", "coins-confirmed"],
        createdAt: new Date().toISOString()
      }
    ],
    joinApplications: [],
    rechargeRequests: [],
    returns: [],
    integrations: {
      payments: {
        preferred: "UPI only",
        allowedMethods: ["UPI"],
        status: "local-upi-simulation",
        upi: {
          merchantName: "GIVE & TAKE",
          upiId: "",
          note: "Add your UPI ID from the admin panel before public launch."
        },
        notes: "Only UPI is enabled. Without a payment gateway API, recharge requests stay pending until admin verifies the UPI payment."
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
