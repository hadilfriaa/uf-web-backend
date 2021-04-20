const express = require('express');
const router = express.Router();
const history = require('../controllers/history.controller');
const verifyAdmin = require ('../middlewares/verifyAdmin');


router.get('/history/:id', history.getOne);
router.post('/history', verifyAdmin, history.create);
router.get('/history', history.getAll);
router.delete('/history/:id', verifyAdmin, history.delete);


module.exports = router;