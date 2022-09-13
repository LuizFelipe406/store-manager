const productModel = require('../models/productModels');

const validateProductName = (name) => {
  if (!name) return { status: false, message: 'NAME_IS_REQUIRED' };
  if (name.length < 5) return { status: false, message: 'NAME_IS_TOO_SMALL' };
  return { status: true };
};

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
  const isNameValid = validateProductName(name);
  if (!isNameValid.status) throw new Error(isNameValid.message);

  const { insertId } = await productModel.insertProduct(name);
  if (!insertId) {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
  return insertId;
};

const updateProduct = async (id, name) => {
  const isNameValid = validateProductName(name);
  if (!isNameValid.status) throw new Error(isNameValid.message);

  const { affectedRows } = await productModel.updateProduct(id, name);
  if (affectedRows === 0) throw new Error('PRODUCT_NOT_FOUND');

  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
};