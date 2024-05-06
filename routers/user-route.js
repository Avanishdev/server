const express=require("express");
const router=express.Router();
const userController=require("../controllers/user-controller");

router.route("/add").post(userController.addNewUser);
router.route("/:id/role").put(userController.assignUserRole);
router.route("/:id/password").put(userController.changePassword);
router.route("/:id").delete(userController.removeUser);
router.route("/:userId/database/:databaseId").put(userController.assignUserToDatabase);

module.exports=router;