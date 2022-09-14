const productServices = require('../services/productServices');

const getProducts = async (req, res, next) => {
  try {
    const response = await productServices.getAllProducts();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productServices.getProductById(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const insertProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const id = await productServices.insertProduct(name);
    res.status(201).json({ id, name });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await productServices.updateProduct(id, name);
    res.status(200).json({
      id,
      name,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productServices.deleteProduct(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};