const express = require('express');
const { getProperties, addProperty, updateProperty, deleteProperty, upload } = require('../controller/propertyController');
const Router = express.Router();
Router.get('/list', getProperties);
Router.post('/register',upload.single('photo'), addProperty);
Router.put('/register/:id',upload.single('photo'), updateProperty)
Router.delete('/:id', deleteProperty);

module.exports = Router;
