const mongoose=require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://mekala_manjula:manjula22@cluster0.ti7hhdg.mongodb.net/TheDevSpace');
};

module.exports=connectDB;


