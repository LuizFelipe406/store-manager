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

module.exports = {
  getProducts,
  getProductById,
};