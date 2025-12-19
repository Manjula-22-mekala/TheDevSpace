const express=require('express');
const bcrypt=require('bcrypt');
const authRouter=express.Router();
const User=require('../models/user.js');
const {validateSignupData}=require('../utils/validation');

authRouter.post('/signup', async (req,res)=>{
   
    try{
        //validate signup data
        validateSignupData(req);
        const {firstName,lastName,emailId,password}=req.body;
        //encrypt password before saving (omitted for brevity)
        const passwordHash=await bcrypt.hash(password,10);
        console.log("passwordHash:",passwordHash);
        //create new user
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });
        await user.save();
        res.send('User signed up successfully');
    }
    catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }
});

authRouter.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const users=await User.findOne({emailId:emailId});
        if(!users){
            throw new Error("Email not found");
        }   
        
        const isPasswordMatch=await users.validatePassword(password);
        if(isPasswordMatch){
            // create jwt token
            const token = await users.getJwt();
            res.cookie("token", token, {httpOnly: true,});
            res.send("Login succesfull!!!");
        }
        else{
            throw new Error("Invalid creddentials");
        } 
    }
    catch(err){
        res.status(400).send("Error logging in:"+err.message);
    }       
});

module.exports=authRouter;

