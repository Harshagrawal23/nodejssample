const express = require('express');
const router = express.Router();
const subscriptionConfirmationController = require('../controllers/subscriptionConfirmation');

router.get('/', subscriptionConfirmationController.renderSubscriptionConfirmation);  

module.exports = router;