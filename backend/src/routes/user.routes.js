const {Router} = require("express");
const {registerUser,loginUser, logoutUser,deleteUserProfile,getLoggedInUserProfile,updateUserPassword, updateUserProfile} = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");
const router = Router();


router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/logout",authenticate, logoutUser)

router.delete("/delete-me",authenticate,deleteUserProfile)
router.get("/me",authenticate,getLoggedInUserProfile)

router.patch("/update-password",authenticate,updateUserPassword)
router.patch("/update",authenticate,updateUserProfile)
// router.put("/update-me",authenticate,updateUserPassword)

module.exports = router;