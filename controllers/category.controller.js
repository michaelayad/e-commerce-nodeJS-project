const categoryService = require("../services/category.service");

const addNewCategory = async (req, res, next) => {
  //  Calling addNewCategory service
  const { type, message, statusCode, category } =
    await categoryService.addNewCategory(req.body);

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
    category,
  });
};
///////////////////////////////////////////////////////////
const updateCategoryDetail = async (req, res, next) => {
  //  Calling addNewCategory service
  req.body.categoryId = req.params.categoryId;
  const { type, message, statusCode, category } =
    await categoryService.updateCategoryDetail(req.body);

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
    category,
  });
};
///////////////////////////////////////////////////////////
const deleteCategory = async (req, res, next) => {
  //  Calling deleteCategory service
  const { type, message, statusCode } = await categoryService.deleteCategory(
    req.params.categoryId
  );

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

module.exports = { addNewCategory, updateCategoryDetail, deleteCategory };
