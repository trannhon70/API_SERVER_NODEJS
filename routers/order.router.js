const express = require("express")
const router = express.Router()
const authorize = require("../middleware/authorize");
const {createOrder} = require("../controllers/order.controller")

router.post("/create", authorize(), createOrder);





module.exports = router