const userCollection = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErorrHandler.js");
const { generateToken } = require("../utils/jwt.utils.js");


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


        let token =await generateToken(existingUser._id,existingUser.tokenVersion);
        res.cookie("myCookie",token,{
            maxAge:1*60*60*1000,//maxAge =>in millisecond (cookie will expire in 1 hrs)
            secure:true,
            httpOnly:true
        })

        res.status(200).json({
            success:true,
            message:"User Loggged in Successfully",
            token
        })
})

const logoutUser = asyncHandler(async (req,res)=>{
        res.clearCookie("myCookie");
        // let user = await userCollection.findById(req.myUser._id)
        // await userCollection.findByIdAndUpdate(req.myUser._id,
        //     {$inc:{
        //         tokenVersion :1 //update the token
        // }});


        await userCollection.updateOne({ _id:req.myUser._id},
            {$inc:{tokenVersion:1}}
        )
        res.status(200).json({
            success:true,
            message:"User Logged Out Succcessfully"
        })
})

const updateUserProfile = asyncHandler(async (req,res)=>{

})

const deleteUserProfile = asyncHandler (async (req,res)=>{
    const { _id} = req.myUser;
})

const updateUserPassword = asyncHandler(async (req,res)=>{})

const getLoggedInUserProfile = asyncHandler (async (req,res)=>{})


module.exports = {
    registerUser,
    loginUser,
    logoutUser
}

