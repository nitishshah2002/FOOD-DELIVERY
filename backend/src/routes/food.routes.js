const {Router} = require('express')
const {addFood, getFood, deleteFood,updateFoodDetails,updateFoodImage} = require('../controllers/food.controller');
const {upload}=require('../middlewares/multer.middleware')
const router = Router();

router.post("/add-food",upload.single("image"),addFood)
router.get("/all-foods",getFood)
router.delete("/delete-one/:id",deleteFood);
router.put("/update-food/:id",updateFoodDetails)
router.patch("/update-image/:id",upload.single("image"),updateFoodImage)


module.exports = router;