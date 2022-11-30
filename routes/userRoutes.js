const express = require("express");
const {
  createUser,
  logInUser,
  logOut,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", logInUser);
router.get("/logout", logOut);

module.exports = router;
