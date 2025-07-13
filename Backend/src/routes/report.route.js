import express from "express";
import authMiddleWare from "../middlewares/auth.middleware.js";
import reportController from "../controllers/report.controller.js";

const router = express.Router()

router.get("/export/tasks",authMiddleWare.protect,authMiddleWare.adminOnly,reportController.exportTasksReport)
router.get("/export/users",authMiddleWare.protect,authMiddleWare.adminOnly,reportController.exportUsersReport)

export default router