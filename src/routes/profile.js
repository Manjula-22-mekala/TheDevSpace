const express=require('express');
const {userauth}=require('../middleware/auth'); 
const profileRouter=express.Router();

profileRouter.get('/profile',userauth,async(req,res)=>{
    try{
        
        const user=req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error retrieving profile:"+err.message);}
    }); 

module.exports=profileRouter;