const express = require("express")
const router = express.Router()
const {authenticateSchema, authenticate,register,getByIdUser,updateUser,deleteUser,getpagingUser} = require("../controllers/user.controller")
const authorize = require("../middleware/authorize");

router.post("/login", authenticateSchema, authenticate);
router.post("/register", register);
router.get("/getbyId/:id", getByIdUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/getpaging", getpagingUser);

module.exports = router