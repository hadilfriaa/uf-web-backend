const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');
const verifyAdmin = require ('../middlewares/verifyAdmin');


router.get('/products/:id', product.getProduct);
router.post('/products', verifyAdmin, product.create);
router.get('/products', product.getAll);
router.put('/products/:id', verifyAdmin, product.modifyProduct);
router.delete('/products/:id', verifyAdmin, product.deleteProduct);
router.get('/calculProducts',verifyAdmin, product.calcul);
router.get('/calculSales',verifyAdmin, product.calculSales);




module.exports = router;