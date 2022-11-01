const express = require("express");
const categoryModel = require("../models/category.model");
const {
  addNewCategory,
  updateCategoryDetail,
  deleteCategory,
} = require("../controllers/category.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth.verifyAdmin, addNewCategory);
router.patch("/:categoryId", auth.verifyAdmin, updateCategoryDetail);
router.delete("/:categoryId", auth.verifyAdmin, deleteCategory);

module.exports = router;
