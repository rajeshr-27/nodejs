const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
//@desc Get all contacts
//route GET /api/contacts
//access private 
const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
})

//@desc Add Contact
//route POST /api/contacts
//access private 
const createContact = asyncHandler(async(req,res) => {

    const {name,email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
       // next('All fiels are mandotory !');
        throw new Error('All fields are mandotory !');
    }
    //create
    const contact = await  Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })

    const json_output = {
        status:1,
        message: 'Successfully created contact',
    }
    res.status(200).json(json_output);
})

//@desc Get individul Contact
//route Get /api/contacts/:id
//access private 
const getContact = asyncHandler(async(req,res) => {
    const contactDetails = await Contact.findById(req.params.id);
    if(!contactDetails){
        res.status(404);
        throw new Error('Contact not found');
    }else {
        res.status(200).json(contactDetails);
    }
    
})

//@desc Update Contact
//route Put /api/contacts/:id
//access private 
const updateContact = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const contact = await Contact.findByIdAndUpdate(id,req.body);

    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    } 

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }

    const json_output = {
        status:1,
        message: 'Successfully updated contact',
    }
    res.status(200).json(json_output);
})

//@desc Update Contact
//route Delete /api/contacts/:id
//access private 
const deleteContact = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts")
    }
    const contacts = await Contact.find({user_id:req.user.id})
    const json_output = {
        status:1,
        message: 'Successfully deleted contact',
        contacts:contacts
    }
    res.status(200).json(json_output);
})

module.exports = {getContacts, createContact, getContact, updateContact,deleteContact };