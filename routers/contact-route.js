const express=require("express")
const router=express.Router()
const contactRoute=require("../controllers/contact-controller")

router.route("/contact").post(contactRoute)

module.exports=contactRoute;