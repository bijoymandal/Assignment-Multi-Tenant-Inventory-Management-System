import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

import Tenant from "./src/models/Tenant.js";
import Product from "./src/models/Product.js";
import Variant from "./src/models/Variant.js";
import Supplier from "./src/models/Supplier.js";
import Order from "./src/models/Order.js";
import PurchaseOrder from "./src/models/PurchaseOrder.js";

await mongoose.connect("mongodb://127.0.0.1:27017/Inventory");

console.time("Seeding");

// Clean DB
await Promise.all([
  Tenant.deleteMany(),
  Product.deleteMany(),
  Variant.deleteMany(),
  Supplier.deleteMany(),
  Order.deleteMany(),
  PurchaseOrder.deleteMany()
]);

// Tenant
const tenant = await Tenant.create({
  name: "Enterprise Store",
  plan: "Enterprise"
});

// Products (1,000)
const products = await Product.insertMany(
  Array.from({ length: 1000 }).map(() => ({
    tenantId: tenant._id,
    name: faker.commerce.productName(),
    category: faker.commerce.department()
  }))
);

// Variants (100,000)
const colors = ["Red", "Blue", "Green", "Black", "White"];
const sizes = ["XS", "S", "M", "L", "XL"];

const variants = [];

for (let i = 0; i < 100000; i++) {
  const product = products[i % products.length];

  variants.push({
    tenantId: tenant._id,
    productId: product._id,
    sku: `SKU-${i}`,
    attributes: {
      color: colors[i % colors.length],
      size: sizes[i % sizes.length]
    },
    stock: faker.number.int({ min: 50, max: 300 }),
    price: faker.number.int({ min: 199, max: 4999 })
  });
}

const savedVariants = await Variant.insertMany(variants, { ordered: false });

// Suppliers (20)
const suppliers = await Supplier.insertMany(
  Array.from({ length: 20 }).map(() => ({
    tenantId: tenant._id,
    name: faker.company.name(),
    phone: faker.phone.number(),
    pricing: []
  }))
);

for (const supplier of suppliers) {
  const priceList = [];

  for (let i = 0; i < 500; i++) {
    const v = savedVariants[i];

    if (!v || !v._id) continue;

    priceList.push({
      variantId: v._id,
      cost: faker.number.int({ min: 100, max: 4000 })
    });
  }

  supplier.pricing = priceList;
  await supplier.save();
}

const purchaseOrders = [];

for (let i = 0; i < 10000; i++) {
  const supplier = suppliers[i % suppliers.length];
  const items = [];

  for (let j = 0; j < 5; j++) {
    const v = savedVariants[(i * j + j) % savedVariants.length];

    if (!v || !v._id) continue;

    const orderedQty = faker.number.int({ min: 10, max: 100 });
    const receivedQty = faker.datatype.boolean()
      ? orderedQty
      : faker.number.int({ min: 1, max: orderedQty });

    const orderedPrice = faker.number.int({ min: 200, max: 4500 });
    const receivedPrice = faker.datatype.boolean()
      ? orderedPrice
      : faker.number.int({ min: orderedPrice - 50, max: orderedPrice + 200 });

    items.push({
      variantId: v._id,
      orderedQty,
      receivedQty,
      orderedPrice,
      receivedPrice
    });

    // ✅ Auto-update stock on receipt
    if (receivedQty > 0) {
      await Variant.updateOne(
        { _id: v._id },
        { $inc: { stock: receivedQty } }
      );
    }
  }

  const status = ["Draft", "Sent", "Confirmed", "Received"][i % 4];

  purchaseOrders.push({
    tenantId: tenant._id,
    supplierId: supplier._id,
    status,
    items,
    createdAt: faker.date.recent({ days: 60 })
  });
}

await PurchaseOrder.insertMany(purchaseOrders, { ordered: false });

const orders = [];

for (let i = 0; i < 10000; i++) {
  const v = savedVariants[i];

  if (!v || !v._id) continue;

  orders.push({
    tenantId: tenant._id,
    items: [{ variantId: v._id, qty: 1, price: v.price }],
    total: v.price,
    status: "Confirmed",
    createdAt: faker.date.recent({ days: 30 })
  });
}

await Order.insertMany(orders, { ordered: false });

console.timeEnd("Seeding");
console.log("✅ Seeding complete: 100K Variants, 10K POs, Stock Updated");

process.exit();
