const express=require('express');
const {userauth}=require('../middleware/auth');
const {validateEditProfileData}=require('../utils/validation'); 
const profileRouter=express.Router();

profileRouter.get('/profile/view',userauth,async(req,res)=>{
    try{
        
        const user=req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error retrieving profile:"+err.message);}
    }); 


profileRouter.patch('/profile/edit',userauth,async(req,res)=>{
    try{
        //validate edit profile data    
        if(!validateEditProfileData(req)){  
            throw new Error("Invalid edit data");
        }
        const loggedinuser=req.user;

        Object.keys(req.body).forEach((key)=>{
            loggedinuser[key]=req.body[key];
        });

        await loggedinuser.save();
        res.json({
            message: `${loggedinuser.firstName},Profile edited successfully`,
            data: loggedinuser,
        });
        
    }
     catch(err){
        res.status(400).send("Error editing profile:"+err.message);
    }   
});

module.exports=profileRouter;