const express=require("express")
const router=express.Router()
const authController=require("../controllers/auth-controller")
const {signupSchema}=require("../validater/auth-validator")
const {signinSchema}=require("../validater/auth-validator")
const validate=require("../middleware/validate-middleware")
const authMiddleware=require("../middleware/auth-middleware")

router.route("/").get(authController.home)
router.route("/register").post(validate(signupSchema),authController.register)
router.route("/login").post(validate(signinSchema),authController.login)
router.route("/user").get(authMiddleware,authController.user);

//export router
module.exports=router;