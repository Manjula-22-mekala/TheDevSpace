const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2  
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
        }
        },
    
    },
    photoUrl:{
        type:String,
    },
    about:{
        type:String,
        default:"This is the default about me section."
    },
    skills:{
        type:[String],
        unique:true,
    }
},
{
    timestamps:true,
});

module.exports=mongoose.model('User',userSchema);
 