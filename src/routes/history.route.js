const express = require('express');
const router = express.Router();
const history = require('../controllers/history.controller');
const verifyAdmin = require ('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');


router.get('/history/:id', history.getOne);
router.post('/history', verifyAdmin, history.create);
router.get('/history', history.getAll);
router.delete('/history/:id', verifyAdmin, history.delete);
router.get('/history/product/:id', verifyToken, history.getAllByIdProduct);

module.exports = router;