const express = require("express")
const router = express.Router()
const {createRole,} = require("../controllers/role.controller")
const authorize = require("../middleware/authorize");

router.post("/create",authorize(), createRole);

module.exports = router