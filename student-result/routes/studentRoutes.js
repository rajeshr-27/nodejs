const express = require('express');
const multer = require('multer');
const { getStudents, getStudent, addStudent, updateStudent, deleteStudent,upload, getStudentByRollno } = require('../controllers/studentController');
const router = express.Router();
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'uploads/')
//     },
//     filename:function(req,file,cb){
//         cb(null,file.originalname)
//     }
// });
// const upload = multer({storage:storage});

router.get('/',getStudents);
router.get('/rollno',getStudentByRollno);
router.get('/:id',getStudent);

router.post('/',upload.single('photo'),addStudent);
router.put('/:id',upload.single('photo'),updateStudent);
router.delete('/:id',deleteStudent);

module.exports = router;