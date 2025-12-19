const mongoose=require('mongoose');
const validator=require('validator');   
const jwt=require('jsonwebtoken'); 
const bcrypt=require('bcrypt');
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
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        },
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough");
            }  
        }
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
        default:"https://www.example.com/default-photo.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL is not valid");
            }  
        }
    },
    about:{
        type:String,
        default:"This is the default about me section."
    },
    skills:{
        type:[String],
        
    }
},
{
    timestamps:true,
});

userSchema.index({firstName:1,lastName:1});

userSchema.methods.getJwt=async function(){
    const user=this;
    const token = await jwt.sign({_id:this._id},"DEV@Tinder190",{expiresIn:'7d'});
    return token;
};

userSchema.methods.validatePassword=async function(passwordinputbyUser){
    const user=this;
    const passwordhash=user.password;
    const isPasswordMatch=await bcrypt.compare(passwordinputbyUser,passwordhash);
    return isPasswordMatch;
}
module.exports=mongoose.model('User',userSchema);
 