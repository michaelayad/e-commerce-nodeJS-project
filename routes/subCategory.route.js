const express = require("express");
const subCategoryModel = require("../models/subCategory.model");
const {
  addNewSubCategory,
  updateSubCategoryDetail,
  deleteSubCategory,
} = require("../controllers/subCategory.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth.verifyAdmin, addNewSubCategory);
router.patch("/:subCategoryId", auth.verifyAdmin, updateSubCategoryDetail);
router.delete("/:subCategoryId", auth.verifyAdmin, deleteSubCategory);

module.exports = router;
