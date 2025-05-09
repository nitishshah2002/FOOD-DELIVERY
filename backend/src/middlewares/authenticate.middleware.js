const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErorrHandler");
const jwt = require("jsonwebtoken")
const userCollection = require("../models/user.model")

const authenticate =asyncHandler (async (req,res,next)=>{
    // console.log(req.cookies)
   let token= req?.cookies?.myCookie;

   if(!token) throw new ErrorHandler("Please login first",401)

    let decodedToken =jwt.verify(token,"secret-key")
    // console.log(decodedToken)
    let user = await userCollection.findById(decodedToken.id);
    if(!user) throw new ErrorHandler("Invalid session ,Please login again!!!",404);


    if(user.tokenVersion !== decodedToken.token) {
        throw new ErrorHandler ("Invalid session ,please login again",404)
    }


    //! adding a new ket-value pair in req object
    req.myUser = user;
    next();
});

module.exports = {authenticate}





//! blacklisting-->
//!token Version 