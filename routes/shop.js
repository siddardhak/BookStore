const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/delete-cart-item',shopController.deleteCartItem);

router.get('/products', shopController.getProducts)

router.get('/checkout', shopController.getCart)

router.get('/orders', shopController.getOrders)

router.get('/products/:productid',shopController.getProductDetails)


module.exports = router;
