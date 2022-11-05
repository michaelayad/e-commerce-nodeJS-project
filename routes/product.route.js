const express = require("express");
const productModel = require("../models/product.model");
const {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");
const auth = require("../middlewares/auth");
const router = express.Router();
router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.post("/", auth.verifySeller, addNewProduct);
router.delete("/:productId", auth.verifySellerWithAdmin, deleteProduct);
router.patch("/:productId", auth.verifySeller, updateProduct);

module.exports = router;
