const express=require('express');       
const connectDB=require('./config/database');
const User=require('./models/user.js');
const {validateSignupData}=require('./utils/validation');
const bcrypt=require('bcrypt');
const app=express();

app.use(express.json());

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
        else{
            const isPasswordMatch=await bcrypt.compare(password,users.password);
            if(isPasswordMatch){
                res.send("Login succesfull!!!");
            }
            else{
                    throw new Error("Invalid creddentials");
            }
        
        }

    }
    catch(err){
        res.status(400).send("Error logging in:"+err.message);
    }       
});

// get user by emailId
app.get('/user', async (req,res)=>{
    const userEmail=req.body.emailId;
    try{
    
        const users=await User.find({emailId:userEmail});
        if (users.length===0){
            res.status(404).send('User not found'); 
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Error retrieving the user:"+err.message);
    }
});

//get all users from database

app.get('/feed',async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }   
    catch(err)
    {
        res.status(400).send("Error retrieving users:"+err.message);
    }
});

//delete user by emailId
app.delete('/users',async(req,res)=>{
    const userId=req.body.userId;       
    try{
        const result=await User.findByIdAndDelete({userId:userId   });
        res.send("user deleted successfully");   
    }
    catch(err){
        res.status(400).send("Error deleting user:"+err.message);
    }       
});
// update user details
app.patch('/users/:userId',async(req,res)=>{    
    const userId=req.params?.userId;
    const data=req.body;
    try{
        const ALLOWED_UPDATES=['userId','firstName','lastName','emailId','age','gender','photoUrl','about','skills'];

        const requestedUpdates=Object.keys(data);

        const isValidOperation=requestedUpdates.every((update)=>ALLOWED_UPDATES.includes(update));  
        if(!isValidOperation)
        {
            throw new Error("updates not allowed");
        };
        if (data?.skills.length>10){
            throw new Error("skills cannot exceed 10");
        }

        const user= await User.findByIdAndUpdate(userId,data,
        {
         returnDocument:"after",
         new:true,
         runValidators:true,
        });

        console.log(user);
        res.send("user updated successfully");
    }
    catch(err){
        res.status(400).send("Error updating user:"+err.message);
    }
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



