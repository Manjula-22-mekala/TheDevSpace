const express=require('express');       

const app=express();

app.use('/user',
    [(req,res,next)=>{
    console.log("Handling the route user");
    next();
    //res.send('Response from user route');
},  (req,res,next)=>{       
    console.log("Second handler for user route");
    next();
   // res.send('Response from second handler of user route');
}],
    (req,res,next)=>{
    console.log("Third handler for user route");
    next();
    //res.send('Response from third handler of user route');
},
    (req,res)=>{
    console.log("Fourth handler for user route");
    res.send('Response from fourth handler of user route');
}
);



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});