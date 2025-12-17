const express=require('express');       

const app=express();

app.get('/user',(req,res)=>{
    res.send({firstname:"Mekala",lastname:"manjula"})
});

app.post('/user',(req,res)=>{
    res.send('Post request called');
});

app.delete('/user',(req,res)=>{
    res.send('Delete request called');
}); 

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});