const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();
const { signup, login } = require("../controllers/user.controller");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
