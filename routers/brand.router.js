const express = require("express")
const router = express.Router()
const authorize = require("../middleware/authorize");
const {createBrand, updateBrand, deleteBrand,getpagingBrand} = require("../controllers/brand.controller")

router.post("/create", authorize(), createBrand);
router.put("/update/:id", authorize(), updateBrand);
router.delete("/delete/:id", authorize(), deleteBrand)
router.get("/getpaging", authorize(), getpagingBrand)



module.exports = router