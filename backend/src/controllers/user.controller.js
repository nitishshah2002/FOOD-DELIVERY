const userCollection = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErorrHandler.js")


const registerUser = (async (req,res)=>{
    const {name,email,password} = req.body;

    let exittingUser = await userCollection.findOne({email});
    if(exittingUser) throw new ErrorHandler("User already exists with this email",400);

    let newUser = await userCollection.create({name,email,password});
    res.status(201).json({
        success:true,
        message:"user registerd Sucesssfully",
        data:newUser,
    })
});

const loginUser = asyncHandler(async (req,res)=>{
    let {email,password} = req.body;

    //!check email is exist  in db
    let existingUser = await userCollection.findOne({email});
    if(!existingUser) throw new ErrorHandler("Please register first",400);

    //! match the password

    let isMatched = await existingUser.comparePassword(password);
    if(!isMatched) throw new ErrorHandler("Invalid credential",400)

        res.status(200).json({
            success:true,
            message:"User Loggged in Successfully"
        })
})


module.exports = {
    registerUser,
    loginUser
}