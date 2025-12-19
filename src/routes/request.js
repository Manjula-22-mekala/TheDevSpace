const express=require('express');
const {userauth}=require('../middleware/auth'); 
const requestRouter=express.Router();
const ConnectionRequest=require("../models/connectionRequest");
const user = require('../models/user');

requestRouter.post(
    '/request/send/:status/:toUserId',
    userauth,
    async (req,res)=>{
        try{
            const fromUserId=req.user._id;
            const toUserId=req.params.toUserId;
            const status=req.params.status;

            const allowedStatuses=["ignored","interested"];
            if(!allowedStatuses.includes(status)){
                return res.status(400).json({message:"Invalid status type"+" "+status});
            }
            //if to user is not in DB
            const toUser=await user.findById(toUserId);
            if(!toUser){
                return res.status(400).json({message:"To user not found"});
            }
            //if there is an existing connection request
            const existingConnectionRequest=await ConnectionRequest.findOne({   
                $or:[
                    {
                        fromUserId:fromUserId,
                        toUserId:toUserId,          
                    },
                    {
                        fromUserId:toUserId,
                        toUserId:fromUserId,
                    },
                ],
            });

            
            
            if (existingConnectionRequest){
                return res.status(400).json({message:"Connection request already exists"});
            }

            const connectionRequest=new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });

            const data=await connectionRequest.save();

            res.json({
                message:req.user.firstName+"is"+status+"in"+toUserId.firstName,
                data,
            });
        }
        catch(err){
            res.status(400).send("ERROR:"+err.message);
        }
        res.send(user.firstName+"sent the connection request!");
    }

)

module.exports=requestRouter;