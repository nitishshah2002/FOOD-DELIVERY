const foodCollection =require("../models/food.model")
const { uploadImageOnCloudinary,deleteImageFromCloudinary } = require("../utils/cloudinary.utils")
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

exports.updateFoodDetails = asyncHandler(async(req,res)=>{
   let {name,description,price,category}=req.body;
   let updateFood = await foodCollection.findByIdAndUpdate(req.params.id,{
      name,
      description,
      price,
      category
   },{
      new:true
   })
   if(!updateFood) throw new ErrorHandler("Food not found")
      res.json({
   suceess:true,
   message:"Update Food details Successfully",
   data:updateFood
})
})

exports.updateFoodImage = asyncHandler(async(req,res)=>{
   let {id}=req.params;
   const food = await foodCollection.findById(id);
   let public_id = food.image[0].public_id;
   if(public_id!==undefined || public_id!==null ){
       let deleteImage = await deleteImageFromCloudinary(public_id);
   }
   let localFilePath = req?.file?.path;
   let uploadResponse = await uploadImageOnCloudinary(localFilePath)
    food.image=[{
         secure_url:uploadResponse.secure_url,
         asset_id:uploadResponse.asset_id,
         public_id:uploadResponse.public_id
      }]

   await food.save();
   res.json({
      success:true,
      message:"Image Updated succeesfully",
      data:food
   })
})




exports.deleteFood = asyncHandler(async(req,res)=>{
   let {id}=req.params;
   let food = await foodCollection.findById({_id:id});
   let public_id = await food.image[0].public_id;
   let deleteImage = await deleteImageFromCloudinary(public_id);
   let deleteFood = await foodCollection.findByIdAndDelete(id);
  
   res.json({
      success:true,
      message:"Food Delete Successfully",
      data:deleteFood
   })
})

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

exports.singleFood = asyncHandler(async (req,res)=>{
   let exc
})