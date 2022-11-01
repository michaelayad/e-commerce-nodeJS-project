var mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema(
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

const subCategoryModel = mongoose.model("SubCategory", subCategorySchema);
module.exports = subCategoryModel;
