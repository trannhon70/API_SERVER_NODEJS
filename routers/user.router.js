const express = require("express")
const router = express.Router()
const {authenticateSchema, authenticate} = require("../controllers/user.controller")

router.post("/user/login", authenticateSchema, authenticate);
module.exports = router