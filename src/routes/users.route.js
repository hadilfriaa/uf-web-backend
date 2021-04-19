const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const userValidation = require ('../middlewares/validators/userValidation');
const verifyToken = require ('../middlewares/verifyToken');
const verifyAdmin = require ('../middlewares/verifyAdmin');


router.post('/users', userValidation, user.create);
router.get('/users/:id', verifyToken, user.getUser);
router.put('/users/:id', verifyToken, user.modifyUser);
router.delete('/users/:id', verifyAdmin, user.deleteUser);
router.post('/login', user.login);
router.get('/users', verifyAdmin, user.getAll);

module.exports = router;