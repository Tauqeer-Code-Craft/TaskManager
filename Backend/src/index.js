import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectdb from "./connectdb.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";
import reportRoute from "./routes/report.route.js";
import cors from "cors";
import { fileURLToPath } from 'url';  // Import URL module
import { dirname } from 'path';      // Import path module

dotenv.config({});

const PORT = process.env.PORT || 3000;
const app = express();

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware and Routes setup
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello from app");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/reports", reportRoute);

// Static file serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectdb();
app.listen(PORT, () => {
  console.log(`Server Started at : http://localhost:${PORT}`);
});
