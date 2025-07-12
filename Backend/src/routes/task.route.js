import express from "express"
import authMiddleWare from "../middlewares/auth.middleware.js"
import taskController from "../controllers/task.controller.js"

const router = express.Router()

router.get("/dashboard-data",authMiddleWare.protect,taskController.getDashboardData);
router.get("/user-dashboard-data",authMiddleWare.protect,taskController.getUserDashboardData);
router.get("/",authMiddleWare.protect,taskController.getTasks);
router.get("/:id",authMiddleWare.protect,taskController.getTasksById);
router.post("/:id",authMiddleWare.protect,authMiddleWare.adminOnly,taskController.createTask);
router.put("/:id",authMiddleWare.protect,taskController.updateTask);
router.delete("/:id",authMiddleWare.protect,taskController.deleteTask);
router.put("/:id/status",authMiddleWare.protect,taskController.updateTaskStatus);
router.put("/:id/todo",authMiddleWare.protect,taskController.updateTaskChecklist);

export default router