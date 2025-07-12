import express from "express"
import authMiddleWare from "../middlewares/auth.middleware.js"
import userController from "../controllers/user.controller.js"

const router = express.Router()

router.get("/", authMiddleWare.protect , authMiddleWare.adminOnly , userController.getUsers)
router.get("/:id", authMiddleWare.protect , userController.getUserById)
router.delete("/:id", authMiddleWare.protect , authMiddleWare.adminOnly , userController.deleteUser)

export default router