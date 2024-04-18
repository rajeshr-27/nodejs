const express = require('express');
const { getEmployees, getEmployee, registerEmployee, updateEmployee, deleteEmployee,uploads } = require('../controller/employeeController');

const Router = express.Router();

Router.get('/list',getEmployees)
Router.get('/:id',getEmployee)
Router.post('/register',uploads.single('photo'),registerEmployee)

Router.put('/register/:id',uploads.single('photo'),updateEmployee)

Router.delete('/:id',deleteEmployee)

module.exports = Router;