const connection = require('./connection');

const insertSale = async (sales) => {
  const [{ insertId: saleId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );

  await Promise.all(sales.map(async (sale) => {
    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [saleId, sale.productId, sale.quantity],
    );
    return sale;
  }));
  return saleId;
};

module.exports = {
  insertSale,
};