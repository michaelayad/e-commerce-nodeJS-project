const subCategoryModel = require("../models/subCategory.model");

//////////////////////////////////////////////////////////////
/*
addNewSubCategory method
*/
const addNewSubCategory = async (body) => {
  var { name, image } = body;
  //  Check all fields

  if (!name || !image) {
    return {
      type: "Error",
      message: "fieldsRequired",
      statusCode: 400,
    };
  }

  const isSubCategoryExist = await subCategoryModel.findOne({ name });

  //  Check if the subcategory already exists
  if (isSubCategoryExist) {
    return {
      type: "Error",
      message: "subcategory already exists",
      statusCode: 409,
    };
  }

  //  Create new subcategory
  const subCategory = await subCategoryModel.create({
    name,
    image,
  });

  // 12) If everything is OK, send user data
  return {
    type: "Success",
    statusCode: 201,
    message: "successful create subcategory",
    subCategory,
  };
};

const updateSubCategoryDetail = async (body) => {
  var { name, image, subCategoryId } = body;
  //  Check all fields

  if (!subCategoryId) {
    return {
      type: "Error",
      message: "enter a subcategory id",
      statusCode: 400,
    };
  }
  //Check if the subcategory already exists
  var subCategory = await subCategoryModel.findById(subCategoryId);
  if (!subCategory) {
    return {
      type: "Error",
      message: "subcategory not exists",
      statusCode: 404,
    };
  }
  subCategory.name = name || subCategory.name;
  subCategory.image = image || subCategory.image;

  //  update new subcategory
  var newSubCategory = await subCategoryModel.findByIdAndUpdate(
    subCategoryId,
    subCategory
  );
  subCategory = await subCategoryModel.findById(subCategoryId);
  // 12) If everything is OK, send user data
  return {
    type: "Success",
    statusCode: 201,
    message: "successful updating sub category",
    subCategory,
  };
};

const deleteSubCategory = async (subCategoryId) => {
  //  Check all fields

  if (!subCategoryId) {
    return {
      type: "Error",
      message: "enter a subCategory id",
      statusCode: 400,
    };
  }
  //Check if the subcategory already exists
  var subCategory = await subCategoryModel.findById(subCategoryId);
  if (!subCategory) {
    return {
      type: "Error",
      message: "subCategory not exists",
      statusCode: 404,
    };
  }

  //  delete subCategory
  await subCategoryModel.findByIdAndDelete(subCategoryId);
  // 12) If everything is OK, send user data
  return {
    type: "Success",
    statusCode: 201,
    message: "successful deleting subcategory",
  };
};

module.exports = {
  addNewSubCategory,
  updateSubCategoryDetail,
  deleteSubCategory,
};
