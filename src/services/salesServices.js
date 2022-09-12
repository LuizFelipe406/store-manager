const salesModels = require('../models/salesModels');
const productModels = require('../models/productModels');
// const productService = require('./productServices');

// const validations = async (sales) => {
//   for (let i = 0; i < sales.length; i += 1) {
//     if (!sales[i].productId) throw new Error('PRODUCT_ID_IS_REQUIRED');
//     if (sales[i].quantity < 1) throw new Error('QUANTITY_INVALID');
//     if (!sales[i].quantity) throw new Error('QUANTITY_IS_REQUIRED');
//     await productService.getProductById(sales[i].productId);
//   }
// };

const insertSale = async (sales) => {
  await Promise.all(sales.map(async (sale) => {
    if (!sale.productId) throw new Error('PRODUCT_ID_IS_REQUIRED');
    if (sale.quantity < 1) throw new Error('QUANTITY_INVALID');
    if (!sale.quantity) throw new Error('QUANTITY_IS_REQUIRED');
    const [response] = await productModels.getProductById(sale.productId);
    if (!response) throw new Error('PRODUCT_NOT_FOUND');
    // productService.getProductById(sale.productId);
    return sale;
  }));

  // await validations(sales);

  const insertId = await salesModels.insertSale(sales);

  return insertId;
};

module.exports = {
  insertSale,
};