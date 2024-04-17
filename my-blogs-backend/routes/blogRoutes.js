const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.use(validateToken);
router.get('/',getBlogs) 
router.get('/:id',getBlog) 
router.post('/',createBlog) 
router.put('/:id',updateBlog)  
router.delete('/:id',deleteBlog) 

module.exports = router;