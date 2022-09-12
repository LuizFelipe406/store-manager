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

module.exports = {
  insertSale,
};