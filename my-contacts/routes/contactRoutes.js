const express = require('express');
const router = express.Router();

const {getContacts, createContact, getContact, updateContact,deleteContact } = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
//Get all contacts and add contact
router.route("/").get(getContacts).post(createContact);

//Get individual, update and delete contact
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;