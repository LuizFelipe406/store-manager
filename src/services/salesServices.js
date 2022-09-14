const camelize = require('camelize');
const salesModels = require('../models/salesModels');
const productModels = require('../models/productModels');

const saleValidation = async (sales) => {
   const error = await Promise.all(sales.map(async (sale) => {
    if (!sale.productId) return 'PRODUCT_ID_IS_REQUIRED';
    if (sale.quantity < 1) return 'QUANTITY_INVALID';
    if (!sale.quantity) return 'QUANTITY_IS_REQUIRED';
    const [response] = await productModels.getProductById(sale.productId);
    if (!response) return 'PRODUCT_NOT_FOUND';
    return null;
   }));
  return error;
};

const insertSale = async (sales) => {
  const validation = await saleValidation(sales);
  validation.forEach((item) => {
    if (item !== null) throw new Error(item);
  });

  const insertId = await salesModels.insertSale(sales);

  return insertId;
};

const getAllSales = async () => {
  const [response] = await salesModels.getAllSales();
  if (!response) throw new Error('INTERNAL_SERVER_ERROR');
  return camelize(response);
};

const getSaleById = async (id) => {
  const [response] = await salesModels.getSaleById(id);
  if (response.length === 0) throw new Error('SALE_NOT_FOUND');
  return camelize(response);
};

const deleteSale = async (id) => {
  const { affectedRows } = await salesModels.deleteSale(id);
  if (affectedRows === 0) throw new Error('SALE_NOT_FOUND');
  return true;
};

const updateSale = async (id, items) => {
  const validation = await saleValidation(items);
  validation.forEach((item) => {
    if (item !== null) throw new Error(item);
  });
  const [isSaleExist] = await salesModels.getSaleById(id);
  if (isSaleExist.length === 0) throw new Error('SALE_NOT_FOUND');
  
  await salesModels.updateSale(id, items);
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};