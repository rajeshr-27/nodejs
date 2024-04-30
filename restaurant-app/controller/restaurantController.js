const asyncHandler = require('express-async-handler');
const multer = require('multer');
const Restaurant = require('../models/restaurantModel');
const { fetchSeedData } = require('../database/seedDatas');

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage});
//@desc Restaurant List
//Method GET /api/restaurant/list
//Access Public
 
const getRestaurants = asyncHandler(async (req,res)=>{
    const restaurants = await Restaurant.find({});
    const json_output = {
        status:1,
        message:"success",
        restaurants:restaurants
    }
    res.status(200).json(json_output);
})

//@desc Restaurant Add
//Method POST /api/restaurant/add
//Access Public

const addRestaurants = asyncHandler(async(req,res)=>{
    console.log(req.body);
    console.log(req.files);
    const {name,rating} = JSON.parse(req.body.data);
    if(!name ||  !rating){
        res.status(400);
        throw new Error('Please enter mandatory fields');
    }
    //Restaurant image check
    const dishesImage = req.files.find((file) => (file.fieldname == 'image'))
    //check dishes menu
    const menu_items = []
    if(req.body.menu.length > 0){       
        const menus = req.body.menu        
        for( let i=0; i <req.body.menu.length; i++){
            const fieldname = "menuimage_"+i;
            //check image file exist or not
            const menuImage = req.files.find((file) => ( file.fieldname == fieldname ))
            const menu_data =  {
                name:menus[i].name,
                price:menus[i].price,
                image: menuImage ? menuImage.filename : ''            
            }
            //console.log(menu_data)
            menu_items.push(menu_data);
        }               
    }  
    //create Restaurant
    await Restaurant.create({
        name,
        image: dishesImage ? dishesImage.filename : "",
        rating,
        menu:menu_items
    })

    //Restaurant List
    const restaurants = await Restaurant.find({});

    const json_output = {
        status:1,
        message:'Restaurant added successfully',
        restaurants
    }
    res.status(200).json(json_output);
})

//@desc Restaurant Update
//Method POST /api/restaurant/update/:id
//Access Public

const updatRestaurant = asyncHandler(async (req,res) => {
    const {id} = req.params;

    console.log(req.files);
   
    const {name,rating} = JSON.parse(req.body.data);

    if(!name || !rating){
        res.status(400);
        throw new Error('Please enter mandatory fields')
    }
    //check image exist or not
    const image = req.files.find(file => file.fieldname === 'image');
    
    
    //check the dishes menu
    const menu_items = [];
    if(req.body.menu.length >0){
        for(let i=0; i <req.body.menu.length; i++){
            const fieldname = "menuimage_"+i;
            //check dishes menu image exist or not
            const dishesImage = req.files.find(file=>file.fieldname === fieldname);

            const menu_id= req.body.menu[i]._id
            // check dishes Menu
            const dishesMenuInfo = await Restaurant.findById(menu_id);
            let oldImage = '';
            if(dishesMenuInfo){
                oldImage = dishesMenuInfo.image
            }            
            const menus = {
                name:req.body.menu[i].name,
                price:req.body.menu[i].price,
                image:(dishesImage) ? dishesImage.filename : oldImage
            }
            menu_items.push(menus);
        }
    }
    //update restaurant
    if(!image){
        await Restaurant.findByIdAndUpdate(id,{
            name:name,
            rating:rating,
            menu:menu_items
        })
    }else {
        await Restaurant.findByIdAndUpdate(id,{
            name:name,
            rating:rating,
            image:image.filename,
            menu:menu_items
        })
    }

     //Restaurant List
     const restaurants = await Restaurant.find({});

    const json_output = {
        status:1,
        message: 'Restaurant updated successfully',
        restaurants
    }
    res.status(200).json(json_output);
})

//@desc Restaurant Delete
//Method DELETE /api/restaurant/delete/:id
//Access Public

const deleteRestaurant = asyncHandler(async (req,res) => {
    const {id} = req.params;

    const restaurantInfo = await Restaurant.findByIdAndDelete(id);

    if(!restaurantInfo){
        res.status(404);
        throw new Error('Restaurant not exist');
    }

    const restaurants = await Restaurant.find({});
    const json_output = {
        status:1,
        message:"Restaurant deleted successfully",
        restaurants:restaurants
    }
    res.status(200).json(json_output);
})


module.exports = {getRestaurants,addRestaurants,upload, updatRestaurant, deleteRestaurant}