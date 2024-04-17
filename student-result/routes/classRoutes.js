const express = require('express');
const { getClasses, addClass, getClass, updateClass,deleteClass } = require('../controllers/classController');
const router = express.Router();

//Fetch all classess
router.get('/',getClasses);

//Fetch single class
router.get('/:id',getClass)

//Add class
router.post('/',addClass)

//Update class
router.put('/:id',updateClass)

//Update class
router.delete('/:id',deleteClass)

module.exports = router;
