const jwt=require('jsonwebtoken');
const User=require('../models/user')

const userauth=async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if (!token){
            throw new Error("Token not found");
        }
        const decodedMessage=jwt.verify(token,"DEV@Tinder190");
        const {_id}=decodedMessage;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("User not fouund");
        }
        req.user=user;
        next();       
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
}
module.exports={userauth};
