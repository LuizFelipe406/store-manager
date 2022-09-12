const productModel = require('../models/productModels');

const getAllProducts = async () => {
  const response = await productModel.getAllProducts();
  if (!response) {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
  return response;
};

const getProductById = async (id) => {
  const [response] = await productModel.getProductById(id);
  if (!response) {
    throw new Error('PRODUCT_NOT_FOUND');
  }
  return response;
};

const insertProduct = async (name) => {
  const { insertId } = await productModel.insertProduct(name);
  if (!insertId) {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
  return insertId;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
};