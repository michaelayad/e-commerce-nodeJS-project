const subCategoryService = require("../services/subCategory.service");

const addNewSubCategory = async (req, res, next) => {
  //  Calling addNewSubCategory service
  const { type, message, statusCode, subCategory } =
    await subCategoryService.addNewSubCategory(req.body);

  //  Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  //  If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
    subCategory,
  });
};
///////////////////////////////////////////////////////////
const updateSubCategoryDetail = async (req, res, next) => {
  //  Calling addNewCategory service
  req.body.subCategoryId = req.params.subCategoryId;
  const { type, message, statusCode, subCategory } =
    await subCategoryService.updateSubCategoryDetail(req.body);

  //  Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  //  If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
    subCategory,
  });
};
///////////////////////////////////////////////////////////
const deleteSubCategory = async (req, res, next) => {
  //  Calling deleteCategory service
  const { type, message, statusCode } =
    await subCategoryService.deleteSubCategory(req.params.subCategoryId);

  //  Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  //  If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
  });
};

module.exports = {
  addNewSubCategory,
  updateSubCategoryDetail,
  deleteSubCategory,
};
