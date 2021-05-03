const express = require('express');
const router = express.Router();
const history = require('../controllers/history.controller');
const verifyAdmin = require ('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.post('/history', verifyToken, history.create);
router.delete('/history/:id', verifyAdmin, history.delete);
router.get('/history/product/:id', verifyToken, history.getAllByIdProduct);

module.exports = router;