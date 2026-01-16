import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      required: true
    },
    qty: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true
    },

    items: [orderItemSchema],

    total: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Draft", "Confirmed", "Partially Fulfilled", "Fulfilled", "Cancelled"],
      default: "Draft",
      index: true
    }
  },
  { timestamps: true }
);

orderSchema.index({ tenantId: 1, createdAt: -1 });

export default mongoose.model("Order", orderSchema);
