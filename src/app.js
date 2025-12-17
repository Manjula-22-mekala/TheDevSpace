const express=require('express');       

const app=express();

const { adminauth,userauth}= require('./middleware/auth');

app.use('/admin',adminauth);


app.get('/user/login',(req,res,next)=>{
    res.send("user login succesfully")
});

app.get('/user/getData',userauth,(req,res)=>
{
    res.send('user data accessed successfully ');
});

app.get('/admin/getAllData',(req,res)=>
{
    res.send('admin data accessed successfully ');
});     

app.get('/admin/deleteData',(req,res)=>
{
    res.send("admiin has deleted data");
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});