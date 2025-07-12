import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleWare from "../middlewares/auth.middleware.js"
import upload from "../middlewares/upload.middleware.js";
const router = express.Router();


router.post("/register",authController.registerUser);
router.post("/login",authController.loginUser);
router.get("/profile",authMiddleWare.protect,authController.getUserProfile);
router.put("/profile",authMiddleWare.protect,authController.updatedUserProfile);

router.post("/upload-image", upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message: "No file uploaded"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl})
})

export default router;