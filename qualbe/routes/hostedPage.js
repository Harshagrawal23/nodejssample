const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/hostedPage');
 
router.post('/createNewCheckout', checkoutController.createCheckoutForNewSubscription);

router.get('/:id', checkoutController.retrieveHostedPage);


module.exports = router;