const {Router} = require('express')
const {addFood, getFood} = require('../controllers/food.controller');
const {upload}=require('../middlewares/multer.middleware')
const router = Router();

router.post("/add-food",upload.single("image"),addFood)
router.get("/all-foods",getFood)

module.exports = router;