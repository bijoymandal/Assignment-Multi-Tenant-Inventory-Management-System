import mongoose from "mongoose";

const poItemSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      required: true
    },

    orderedQty: { type: Number, required: true, min: 1 },
    receivedQty: { type: Number, default: 0, min: 0 },

    orderedPrice: { type: Number, required: true },
    receivedPrice: { type: Number }
  },
  { _id: false }
);

const purchaseOrderSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
      index: true
    },

    status: {
      type: String,
      enum: ["Draft", "Sent", "Confirmed", "Received"],
      default: "Draft",
      index: true
    },

    items: [poItemSchema]
  },
  { timestamps: true }
);

purchaseOrderSchema.index({ tenantId: 1, status: 1 });

export default mongoose.model("PurchaseOrder", purchaseOrderSchema);
