const express=require('express');       
const connectDB=require('./config/database');
const User=require('./models/user.js');
const app=express();

app.use(express.json());
app.post('/signup', async (req,res)=>{
    const user=new User(req.body)
    try{
        await user.save();
        res.send('User signed up successfully');
    }
    catch{
        res.status(400).send("Error saving the user:"+err.message);
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



