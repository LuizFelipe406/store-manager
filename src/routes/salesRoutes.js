const express = require('express');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.insertSale);

router.get('/', salesController.getAllSales);

module.exports = router;