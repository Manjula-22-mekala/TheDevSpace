const mongoose=require('mongoose');

const connectionRequestSchema=new mongoose.Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        status:{
            type:String,
            require:true,
            enum:["ignore","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        },
    },
    {
        timestamps:true,
    }
);
//coumpound index
connectionRequestSchema.index({fromUserId:1,toUserId:1});
//if user sent connection request to himself
connectionRequestSchema.pre('save',async function(next){
    const connectionRequest=this;   
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("User cannot send connection request to himself");
    }
    next();
});

//export the model

const ConnectionRequestModel=new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);

module.exports=ConnectionRequestModel;