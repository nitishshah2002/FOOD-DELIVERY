const error =  (err,req,res,next)=>{
    //!global error handler
    err.statusCode = err.statusCode || 500;
    err.message= err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        errObj:err,
    })
}

module.exports=error;

//obj1 ==> new Error("Internal Server Error",500)
//obj2==> new Error ("msg",123)