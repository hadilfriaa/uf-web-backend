const express = require('express');
const router = express.Router();

const userRouter = require('./users.route');
const productRouter = require('./products.route');
const historyRouter = require('./history.route');

router.use(userRouter);
router.use(productRouter);
router.use(historyRouter)

module.exports = router;