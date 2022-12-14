const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getProducts);

router.get('/search', productController.getProductsByTerm);

router.get('/:id', productController.getProductById);

router.post('/', productController.insertProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;