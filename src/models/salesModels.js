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

const getAllSales = async () => {
  const response = await connection.execute(
    `SELECT
    sp.sale_id, sa.date, sp.product_id, sp.quantity
    FROM StoreManager.sales as sa
    JOIN StoreManager.sales_products as sp
    ON sa.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id`,
  );
  return response;
};

const getSaleById = async (id) => {
  const response = await connection.execute(
    `SELECT
    sa.date, sp.product_id, sp.quantity
    FROM StoreManager.sales as sa
    JOIN StoreManager.sales_products as sp
    ON sa.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id`,
    [id],
  );
  return response;
};

const deleteSale = async (id) => {
  const [response] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return response;
};

const updateSale = async (id, items) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  const result = await Promise.all(items.map(async (sale) => {
    const [response] = await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [id, sale.productId, sale.quantity],
    );
    return response;
  }));
  return result;
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};