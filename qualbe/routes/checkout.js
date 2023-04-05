const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout');

router.get('/:itemPriceId', checkoutController.renderCheckout);  

module.exports = router;