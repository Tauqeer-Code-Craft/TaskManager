import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleWare from "../middlewares/auth.middleware.js"
const router = express.Router();


router.post("/register",authController.registerUser);
router.post("/login",authController.loginUser);
router.get("/profile",authMiddleWare.protect,authController.getUserProfile);
router.put("/profile",authMiddleWare.protect,authController.updatedUserProfile);


export default router;