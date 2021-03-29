const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');



router.get('/products/:id', product.getProduct);

router.post('/products/create', product.create);
router.get('/products/all', product.getAllProduct);
router.post('/products/update/:id', product.modifyProduct);
router.get('/products/delete/:id', product.deleteProduct);


module.exports = router;