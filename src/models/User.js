const userSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
    index: true
  },

  name: String,
  email: { type: String, unique: true },
  password: String,

  role: {
    type: String,
    enum: ["Owner", "Manager", "Staff"],
    default: "Staff"
  }
});
