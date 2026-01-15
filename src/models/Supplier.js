import mongoose from "mongoose";

const supplierPricingSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
      index: true
    },
    cost: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const supplierSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      index: true
    },

    phone: {
      type: String,
      required: true
    },

    email: {
      type: String
    },

    address: {
      type: String
    },

    pricing: [supplierPricingSchema],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", supplierSchema);
