const express = require('express');
const router = express.Router();
const Contact = require("../models/contact");

router.get("/", async (req, res)=>{
    try{
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal server error'})
    }
});

router.post("/", async (req, res)=>{
    try{
        const data = req.body; // Assuming the request body contains the cantact data
        //Create a new cantact document using the mongodb model
        const newContact = new Contact(data);   //directly setting data
        //save the new person to the database
        const response = await newContact.save();
        console.log('data saved succesfully...');
        res.status(200).json(response);
    }catch(err){
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }   
});

router.get("/:id", async (req, res)=>{
    try{
        const contact_id = req.params.id;
        const responce = await Contact.findById(contact_id);
        if(!responce){
            res.status(404).json({message : 'contact not found'});
        }else{
            res.status(200).json(responce);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error' });
    }
});
router.put("/:id",async (req, res)=>{
    try{
        const data = req.body;
        const contact_id = req.params.id;
        const responce = await Contact.findByIdAndUpdate(contact_id, data, {
            new:true,
            runValidators: true,
        });
        if(!responce){
            res.status(404).json({message : 'contact not found'});
        }else{
            res.status(200).json(responce);
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error' });
    }
});

router.delete("/:id",async (req, res)=>{
    try{
        const contact_id = req.params.id;
        const responce = await Contact.findByIdAndDelete(contact_id);
        if(!responce){
            res.status(404).json({message : 'contact not found'});
        }else{
            res.status(200).json({message : 'data deleted'});
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error' });
    }
});


module.exports = router;