const asyncHandler=require("express-async-handler");
const ErrorHandler=require("../utils/ErorrHandler");

const authorize=asyncHandler(async (req,res)=>{
    let currentUserRole=req.myUser.role;
    if(currentUserRole!=="admin"){
        throw new ErrorHandler(`unthorized.access,${req.myUser.role} is not allow is access this route,403`)
    }
    next();
})

module.exports={authorize}