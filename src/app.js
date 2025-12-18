const express=require('express');       
const connectDB=require('./config/database');
const User=require('./models/user.js');
const user = require('./models/user.js');
const app=express();

app.use(express.json());

app.post('/signup', async (req,res)=>{
    const user=new User(req.body)
    try{
        await user.save();
        res.send('User signed up successfully');
    }
    catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }
});
// get user by emailId
app.get('/user', async (req,res)=>{
    const userEmail=req.body.emailId;
    try{
    
        const users=await user.find({emailId:userEmail});
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
})

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



