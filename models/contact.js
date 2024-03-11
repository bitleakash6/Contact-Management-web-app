const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

//define the person schema
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    mobile:{
        type: String,
        required: true,
    },
});


//create Person model
const contact = mongoose.model('Contact', contactSchema);
module.exports = contact;