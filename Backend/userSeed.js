import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Tenant from "./src/models/Tenant.js";
import User from "./src/models/User.js";

await mongoose.connect("mongodb://127.0.0.1:27017/Inventory");

console.log("Seeding Users...");

const tenant = await Tenant.findOne();
if (!tenant) {
  console.log("No tenant found. Run seed.js first.");
  process.exit();
}

// Delete old users
await User.deleteMany({ tenantId: tenant._id });

// Hash password
const hashedPassword = await bcrypt.hash("123456", 10);

// Insert users
await User.insertMany([
  {
    tenantId: tenant._id,
    name: "Store Owner",
    email: "owner@test.com",
    password: hashedPassword,
    role: "Owner"
  },
  {
    tenantId: tenant._id,
    name: "Manager",
    email: "manager@test.com",
    password: hashedPassword,
    role: "Manager"
  },
  {
    tenantId: tenant._id,
    name: "Staff",
    email: "staff@test.com",
    password: hashedPassword,
    role: "Staff"
  }
]);

console.log("Users seeded successfully");
process.exit();
