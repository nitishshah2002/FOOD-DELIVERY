const asyncHandler = require("express-async-handler")
const { cloudinary } = require("../configs/cloudinary")
const fs = require("fs")
const cloud = require("cloudinary")
// const {upload}=require("../middlewares/multer.middleware")
let uploadImageOnCloudinary = (async(path)=>{
   if(!path) return null;
   let result= await cloud.uploader.upload(path,{
      folder:"bitByte",
   });
   fs.unlinkSync(path);
   return result
})


module.exports = {uploadImageOnCloudinary}