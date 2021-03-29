const express = require('express');
const router = express.Router();

const userRouter = require('./users.route');
const productRouter = require('./products.route');

router.use(userRouter);
router.use(productRouter);

module.exports = router;