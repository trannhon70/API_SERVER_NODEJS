const express = require("express")
const router = express.Router()
const authorize = require("../middleware/authorize");
const {createBrand} = require("../controllers/brand.controller")
router.post("/create", authorize(), createBrand);


module.exports = router