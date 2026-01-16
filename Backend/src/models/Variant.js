import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },

    sku: { type: String, required: true, unique: true, index: true },

    attributes: {
      color: String,
      size: String
    },

    stock: { type: Number, default: 0, min: 0, index: true },

    price: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Variant", variantSchema);
