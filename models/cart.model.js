var mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    Items: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        totalProductQuantity: {
          type: Number,
          default: 1,
        },
        totalProductPrice: {
          type: Number,
        },
      },
    ],
    totalQuantity: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);

const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;
