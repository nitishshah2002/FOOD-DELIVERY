const {Router} = require("express");
const {registerUser} = require("../controllers/user.controller");
const router = Router();


router.get("/register",registerUser);

module.exports = router;