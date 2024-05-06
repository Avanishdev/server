const express=require("express");
const router=express.Router();
const connectController=require("../controllers/connect-instance-controller");
const mongoInstance=require("../models/connect-instance-model");

router.route("/add").post(connectController.addNewInstance);
router.route("/show").get(connectController.getInstances);
router.route("/details").get(connectController.getInstances);

module.exports=router;