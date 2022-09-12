const salesModels = require('../models/salesModels');
const productModels = require('../models/productModels');

const insertSale = async (sales) => {
  await Promise.all(sales.map(async (sale) => {
    if (!sale.productId) throw new Error('PRODUCT_ID_IS_REQUIRED');
    if (sale.quantity < 1) throw new Error('QUANTITY_INVALID');
    if (!sale.quantity) throw new Error('QUANTITY_IS_REQUIRED');
    const [response] = await productModels.getProductById(sale.productId);
    if (!response) throw new Error('PRODUCT_NOT_FOUND');
    return sale;
  }));

  const insertId = await salesModels.insertSale(sales);

  return insertId;
};

module.exports = {
  insertSale,
};