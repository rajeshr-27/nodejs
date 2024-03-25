const express = require('express');
const { register, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(loginUser)

router.get('/current',validateToken, currentUser)

module.exports = router;