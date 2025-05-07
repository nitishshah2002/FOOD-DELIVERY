const userCollection = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const registerUser = (async (req,res)=>{
    const {name,email,password} = req.body;

    let newUser = await userCollection.create({name,email,password});
    res.status(201).json({
        success:true,
        message:"user registerd Sucesssfully",
        data:newUser,
    })
});


module.exports = {
    registerUser,
}