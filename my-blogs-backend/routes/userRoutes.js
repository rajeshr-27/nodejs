const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

 router.get('/', getUsers)

 router.post('/',createUser)
 ;
 router.put('/:id', updateUser);

 router.delete('/:id', deleteUser)

 router.post('/login', loginUser);

 router.get('/current', validateToken,currentUser);

 module.exports = router;