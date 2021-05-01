const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');
const verifyToken = require ('../middlewares/verifyToken');
const verifyUserAdmin = require ('../middlewares/verifyUserAdmin');
const verifyAdmin = require ('../middlewares/verifyAdmin');


router.get('/products/:id', product.getProduct);
router.post('/products', verifyToken, product.create);
router.get('/products', product.getAll);
router.put('/products/:id', verifyUserAdmin, product.modifyProduct);
router.delete('/products/:id', verifyUserAdmin, product.deleteProduct);
router.get('/calculProducts',verifyAdmin, product.calcul);
router.get('/calculSales',verifyAdmin, product.calculSales);
router.get('/products/user/:id', verifyToken, product.getProductsByIdUser);




module.exports = router;