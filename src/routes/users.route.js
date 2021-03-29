const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const userValidation = require ('../middlewares/validation/userValidation');


router.post('/users/create',userValidation, user.create);
router.get('/users/:id', user.getUser);
router.post('/users/login', user.login);

module.exports = router;