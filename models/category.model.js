var mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
