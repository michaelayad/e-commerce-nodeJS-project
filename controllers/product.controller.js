const productService = require("../services/product.service");

const getAllProducts = async (req, res, next) => {
  const { type, message, statusCode, totalProducts } =
    await productService.getAllProducts();
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
    totalProducts,
  });
};
const addNewProduct = async (req, res, next) => {
  const seller = req.userId;
  const { type, message, statusCode, product } =
    await productService.addNewProduct(req.body, seller);
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
    product,
  });
};
const deleteProduct = async (req, res, next) => {
  const { type, message, statusCode } = await productService.deleteProduct(
    req.params.productId,
    req.userId,
    req.role
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
module.exports = { getAllProducts, addNewProduct, deleteProduct };
