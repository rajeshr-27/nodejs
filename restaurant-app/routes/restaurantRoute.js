const express =  require('express');
const { getRestaurants, addRestaurants, upload, updatRestaurant, deleteRestaurant } = require('../controller/restaurantController');
const Router = express.Router();

Router.get('/list',getRestaurants);
Router.post('/add', upload.any(),addRestaurants);
Router.post('/update/:id', upload.any(),updatRestaurant);
Router.delete('/delete/:id',deleteRestaurant);
module.exports = Router;