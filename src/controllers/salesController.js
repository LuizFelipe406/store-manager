const salesServices = require('../services/salesServices');

const insertSale = async (req, res, next) => {
  try {
    const { body } = req;
    const id = await salesServices.insertSale(body);
    res.status(201).json({
      id,
      itemsSold: body,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const response = await salesServices.getAllSales();
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await salesServices.getSaleById(id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesServices.deleteSale(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  deleteSale,
};