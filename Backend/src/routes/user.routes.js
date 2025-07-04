import express from "express"
import authController from "../controllers/auth.controllers.js"
const router = express.Router()

router.get("/user",authController.handleCred)

export default router