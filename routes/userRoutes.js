const express = require("express");
const {
  createUser,
  logInUser,
  logOut,
  dashBoard,
} = require("../controllers/userController");

const router = express.Router();

//Custom Middleware
const auth = require("../middleware/auth");

router.post("/register", createUser);
router.post("/login", logInUser);
router.get("/logout", logOut);
router.get("/dashboard", auth, dashBoard);

module.exports = router;
