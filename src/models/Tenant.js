import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    plan: { type: String, default: "Free" }
  },
  { timestamps: true }
);

export default mongoose.model("Tenant", tenantSchema);
