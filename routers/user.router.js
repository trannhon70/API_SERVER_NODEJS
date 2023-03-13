const express = require("express")
const router = express.Router()
const {authenticateSchema, authenticate,register,getByIdUser,updateUser,deleteUser,getpagingUser} = require("../controllers/user.controller")
const authorize = require("../middleware/authorize");

router.post("/login", authenticateSchema, authenticate);
router.post("/register", register);
router.get("/getbyId/:id",authorize(), getByIdUser);
router.put("/update/:id",authorize(), updateUser);
router.delete("/delete/:id",authorize(), deleteUser);
router.get("/getpaging",authorize(), getpagingUser);

module.exports = router