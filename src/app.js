const express=require('express');       

const app=express();

app.use('/hello',(req,res)=>{
    res.send('Hello hello hello hello');   
});

app.use('/test',(req,res)=>{
    res.send('Hello World from test route');   
});

app.use('/',(req,res)=>{
    res.send('Hello World');   
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});