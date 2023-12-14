const express = require("express")
const router = express.Router()
const {createRole,getAllRole} = require("../controllers/role.controller")
const authorize = require("../middleware/authorize");

/**
 * @swagger
 * /api/role/create:
 *   post:
 *     summary: Tạo phân quyền user
 *     description: Tạo phân quyền user với thông tin cần thiết
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       400:
 *         description: Lỗi trong quá trình tạo người dùng
 *       401:
 *         description: Không được phép thực hiện thao tác
 *       500:
 *         description: Lỗi máy chủ
 */
router.post("/create", authorize(), createRole);
router.get("/getAll", authorize(), getAllRole);

module.exports = router