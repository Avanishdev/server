const express = require("express");
const router = express.Router();
const databaseController = require("../controllers/database-controller");

router.route("/create").post(databaseController.addNewDatabase);
router.route("/show").get(databaseController.getDatabases);
router.route("/remove/:id").delete(databaseController.deleteDatabase);

module.exports = router;