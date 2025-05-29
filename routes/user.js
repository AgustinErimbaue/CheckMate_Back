const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middleware/authentication");

router.post("/create", UserController.createUser);
router.post("/login", UserController.loginUser);
router.delete("/logout", authentication, UserController.logoutUser);
module.exports = router;
