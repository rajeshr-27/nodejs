const express = require('express');
const { getMarks, getMark, addMark, updateMark, deleteMark } = require('../controllers/markController');
const router = express.Router();

router.get('/',getMarks);
router.get('/:id',getMark);
router.post('/',addMark);
router.put('/:id',updateMark);
router.delete('/:id',deleteMark);

module.exports = router;
