import express from "express"
import authController from "../controllers/auth.controllers.js"
const router = express.Router()

router.get("/user",handleCred)

export default router