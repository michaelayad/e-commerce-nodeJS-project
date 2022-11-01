const express = require("express");
const productModel = require("../models/product.model");
const {
  getAllProducts,
  addNewProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", auth.verifySeller, addNewProduct);
router.delete("/:productId", auth.verifySellerWithAdmin, deleteProduct);

module.exports = router;
