const express = require('express');
const { getUser, getUsers, addUser, updateUser, deleteUser, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../../my-blogs-backend/middleware/validateTokenHandler');

const router = express.Router();


router.get('/', getUsers);
router.get('/:id',getUser)
router.post('/', addUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.post('/login', loginUser);
router.post('/current', currentUser);


module.exports = router;