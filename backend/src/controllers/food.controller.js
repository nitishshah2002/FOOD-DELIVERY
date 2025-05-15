const foodCollection =require("../models/food.model")
const { uploadImageOnCloudinary } = require("../utils/cloudinary.utils")
const asyncHandler = require("express-async-handler")
const ErrorHandler= require("../middlewares/error.middleware")

exports.addFood=async(req,res)=>{
   const {name,description,price,category} =req.body;
   const locakFilePath=req.file.path;
   let uploadResponse=await uploadImageOnCloudinary(locakFilePath)
   console.log(uploadResponse)

   let newFood = await foodCollection.create({
      name,
      description,
      price,
      category,
      image:[{
         secure_url:uploadResponse?.secure_url,
         asset_id:uploadResponse?.asset_id,
         public_id:uploadResponse?.public_id
      }]
      // "image.url"
   }) 
   res.json({
  success:true,
  message:"Food Data Upload SuccessFully",
  data:newFood
   })
}

exports.updateFoodDetails = asyncHandler(async(req,res)=>{})

exports.updateFoodImage = asyncHandler(async(req,res)=>{})




exports.deleteFood = asyncHandler(async(req,res)=>{})

exports.getFood  = asyncHandler(async(req,res)=>{
   let foods = await foodCollection.find();
   if(foods.length===0) throw new ErrorHandler("no food found",404)

      res.json({
         success:true,
         count:foods.length,
         message:"Food feteced Succeessfully",
         data:foods
      })
})