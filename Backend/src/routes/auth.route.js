import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleWare from "../middlewares/auth.middleware.js"
import upload from "../middlewares/upload.middleware.js";
import cloudinary from "../utils/cloudinary.js";
import {getDataUri} from "../utils/dataUri.js"

const router = express.Router();

router.post("/register", upload.single("image"), authController.registerUser);
router.post("/login",authController.loginUser);
router.get("/profile",authMiddleWare.protect,authController.getUserProfile);
router.put("/profile",authMiddleWare.protect,authController.updatedUserProfile);
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    // Step 1: Validate file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Step 2: Convert buffer to base64 using datauri
    const fileUri = getDataUri(req.file);

    // Step 3: Upload to Cloudinary
    const result = await cloudinary.upload(fileUri.content, {
      folder: "task-manager",
      use_filename: true,
      unique_filename: false,
    });

    const imageUrl = result.secure_url;

    // Step 4: Send or store the image URL
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ message: "Error uploading image to Cloudinary" });
  }
});

export default router;