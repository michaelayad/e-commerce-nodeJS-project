const categoryModel = require("../models/category.model");

//////////////////////////////////////////////////////////////
/*
addNewCategory method
*/
const addNewCategory = async (body) => {
  var { name, image } = body;
  //  Check all fields

  if (!name || !image) {
    return {
      type: "Error",
      message: "fieldsRequired",
      statusCode: 400,
    };
  }

  const isCategoryExist = await categoryModel.findOne({ name });

  //  Check if the category already exists
  if (isCategoryExist) {
    return {
      type: "Error",
      message: "category already exists",
      statusCode: 409,
    };
  }

  //  Create new category
  const category = await categoryModel.create({
    name,
    image,
  });

  // 12) If everything is OK, send user data
  return {
    type: "Success",
    statusCode: 201,
    message: "successful create category",
    category,
  };
};

const updateCategoryDetail = async (body) => {
  var { name, image, categoryId } = body;
  //  Check all fields

  if (!categoryId) {
    return {
      type: "Error",
      message: "enter a category id",
      statusCode: 400,
    };
  }
  //Check if the category already exists
  var category = await categoryModel.findById(categoryId);
  if (!category) {
    return {
      type: "Error",
      message: "category not exists",
      statusCode: 404,
    };
  }
  category.name = name || category.name;
  category.image = image || category.image;

  //  update new category
  var newCategory = await categoryModel.findByIdAndUpdate(categoryId, category);
  category = await categoryModel.findById(categoryId);
  // 12) If everything is OK, send user data
  return {
    type: "Success",
    statusCode: 201,
    message: "successful updating category",
    category,
  };
};

const deleteCategory = async (categoryId) => {
  //  Check all fields

  if (!categoryId) {
    return {
      type: "Error",
      message: "enter a category id",
      statusCode: 400,
    };
  }
  //Check if the category already exists
  var category = await categoryModel.findById(categoryId);
  if (!category) {
    return {
      type: "Error",
      message: "category not exists",
      statusCode: 404,
    };
  }

  //  delete category
  await categoryModel.findByIdAndDelete(categoryId);
  // 12) If everything is OK, send user data
  return {
    type: "Success",
    statusCode: 201,
    message: "successful deleting category",
  };
};

module.exports = { addNewCategory, updateCategoryDetail, deleteCategory };
