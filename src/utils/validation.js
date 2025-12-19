const validator=require('validator');   

const validateSignupData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName|| !lastName){
        throw new Error("First name and last name are required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
    return true;
};

const validateEditProfileData = (req) => {
    if (!req.body || typeof req.body !== "object") {
        return false;
    }

    const allowedEditFields = [
        'firstName',
        'lastName',
        'age',
        'gender',
        'photoUrl',
        'about',
        'skills'
    ];

    const bodyKeys = Object.keys(req.body);

    if (bodyKeys.length === 0) return false;

    return bodyKeys.every(field =>
        allowedEditFields.includes(field)
    );
};

module.exports={
    validateSignupData,
    validateEditProfileData
};