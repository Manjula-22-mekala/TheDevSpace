const express=require('express');       
const connectDB=require('./config/database');
const User=require('./models/user.js');
const {validateSignupData}=require('./utils/validation');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken'); 
const {userauth}=require('./middleware/auth'); 
const app=express();

app.use(express.json());
app.use(cookieParser());
app.post('/signup', async (req,res)=>{
   
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

app.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const users=await User.findOne({emailId:emailId});
        if(!users){
            throw new Error("Email not found");
        }   
        
        const isPasswordMatch=await bcrypt.compare(password,users.password);
        if(isPasswordMatch){
            // create jwt token
            const token = await jwt.sign({_id:users._id},"DEV@Tinder190",{expiresIn:'1d'});
            // set token in cookies
            res.cookie("token",token);
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
//profiele api

app.get('/profile',userauth,async(req,res)=>{
    try{
        
        const user=req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error retrieving profile:"+err.message);}
    }); 


connectDB()
    .then(()=>{  
        console.log('Database connected successfully');
        app.listen(3000,()=>{
        console.log('Server is running on port 3000');
    });
    })
    .catch((err)=>{
        console.log('Database connection failed',err);
});



