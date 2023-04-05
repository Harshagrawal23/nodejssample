const express = require('express');
const router = express.Router();
const customerController = require('./../controllers/customer');

router.get('/:phone', customerController.fetchCustomerByPhone);

module.exports = router;