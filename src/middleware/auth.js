const adminauth =(req,res,next)=>
{
    console.log('Admin middleware executed');
    const token='xyz';
    const isAuthorizedadmin= token==='xyz';
    if(!isAuthorizedadmin){
        res.status(401).json("unauthorized");

    }else{
        next();
    }
};

const userauth=(req,res,next)=>{
    console.log('User middleware executed');
    const token='abc';
    const isAuthorizeduser= token==='abc';      
    if(!isAuthorizeduser){                      
        res.status(401).json("unauthorized");
    }else{
        next(); 

    }
}
module.exports={adminauth,userauth};
