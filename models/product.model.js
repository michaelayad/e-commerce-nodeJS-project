var mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    subImages: [String],
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
      default: 0,
    },
    priceAfterSale: {
      type: Number,
      default: this.price - this.price * (this.sale / 100),
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    outOfStock: {
      type: Boolean,
      default: true,
    },
    ratingAverage: {
      type: Number,
      default: 4,
      min: 1,
      max: 5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
