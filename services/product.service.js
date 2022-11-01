const productModel = require("../models/product.model");

const getAllProducts = async function () {
  try {
    var totalProducts = await productModel
      .find()
      .populate("category")
      .populate("subCategory")
      .populate("seller", { name: 1 });
    return {
      type: "Success",
      message: "successful getAllProducts",
      statusCode: 201,
      totalProducts,
    };
  } catch {
    return {
      type: "Error",
      statusCode: 400,
      message: "error getting all products",
    };
  }
};
const addNewProduct = async (body, seller) => {
  //   console.log(body);

  var {
    name,
    mainImage,
    subImages,
    description,
    category,
    subCategory,
    price,
    sale,
    priceAfterSale,
    quantity,
    outOfStock,
  } = body;
  //  Check all fields
  if (
    !name ||
    !mainImage ||
    !description ||
    !category ||
    !subCategory ||
    !seller ||
    !price
  ) {
    return {
      type: "Error",
      message: "fieldsRequired",
      statusCode: 400,
    };
  }

  if (!Array.isArray(subImages)) {
    return {
      type: "Error",
      message: "subimages must be an array",
      statusCode: 400,
    };
  }
  subImages = subImages || [];
  if (!sale) sale = 0;
  priceAfterSale = priceAfterSale
    ? priceAfterSale
    : price - price * (sale / 100);
  if (!quantity) quantity = 0;
  if (quantity <= 0) outOfStock = true;
  else outOfStock = false;

  //  Create new product
  try {
    const product = await productModel.create({
      name,
      mainImage,
      subImages,
      description,
      category,
      subCategory,
      seller,
      price,
      sale,
      priceAfterSale,
      quantity,
      outOfStock,
    });
    console.log(product);
    // 12) If everything is OK, send user data
    return {
      type: "Success",
      statusCode: 201,
      message: "successful create product",
      product,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 400,
      message: "failed create product",
    };
  }
};
const deleteProduct = async (productId, userId, role) => {
  const user = await productModel.findById(productId, { seller: 1 });
  if (!user) {
    return {
      type: "Error",
      statusCode: 400,
      message: "this product isn't found",
    };
  }
  if (role === "seller") {
    if (user.seller != userId)
      return {
        type: "Error",
        statusCode: 400,
        message: "this user cannot delete this product",
      };
  }

  const product = await productModel
    .findOneAndDelete({ _id: productId })
    .then((err) => {
      if (err)
        return {
          type: "Error",
          statusCode: 400,
          message: err,
        };
    });
  return {
    type: "Success",
    statusCode: 200,
    message: "seccessfully deleted product",
  };
};

module.exports = { getAllProducts, addNewProduct, deleteProduct };
