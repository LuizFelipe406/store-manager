const errors = {
  PRODUCT_NOT_FOUND: {
    status: 404,
    message: 'Product not found',
  },
};

const errorMiddleware = (error, req, re, _next) => {
  const { message } = error;
  re.status(errors[message].status).json({ message: errors[message].message });
};

module.exports = errorMiddleware;