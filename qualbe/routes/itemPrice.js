const express = require('express');
const router = express.Router();
const itemPriceController = require('../controllers/itemPrice');
 
router.get('/:item_price_id', itemPriceController.fetchItemPrice);

module.exports = router;