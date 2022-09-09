const errors = {
  PRODUCT_NOT_FOUND: {
    status: 404,
    message: 'Product not found',
  },
};

const errorMiddleware = (error, req, re, _next) => {
  const { message } = error;
  if (Object.keys(errors).includes(message)) {
    return re.status(errors[message].status).json({ message: errors[message].message });
  }
  return re.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;