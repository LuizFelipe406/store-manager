const errors = {
  PRODUCT_NOT_FOUND: {
    status: 404,
    message: 'Product not found',
  },
  NAME_IS_REQUIRED: {
    status: 400,
    message: '"name" is required',
  },
  NAME_IS_TOO_SMALL: {
    status: 422,
    message: '"name" length must be at least 5 characters long',
  },
  PRODUCT_ID_IS_REQUIRED: {
    status: 400,
    message: '"productId" is required',
  },
  QUANTITY_IS_REQUIRED: {
    status: 400,
    message: '"quantity" is required',
  },
  QUANTITY_INVALID: {
    status: 422,
    message: '"quantity" must be greater than or equal to 1',
  },
  SALE_NOT_FOUND: {
    status: 404,
    message: 'Sale not found',
  },
};

const errorMiddleware = (error, req, re, _next) => {
  const { message } = error;
  if (Object.keys(errors).includes(message)) {
    return re.status(errors[message].status).json({ message: errors[message].message });
  }
  console.log(error);
  return re.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;