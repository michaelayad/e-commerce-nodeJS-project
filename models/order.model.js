const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    shippingAddress: {
      country: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    phone: { type: String, required: true },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    status: {
      type: String,
      default: "not processed",
      enum: [
        "not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamp: true }
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
