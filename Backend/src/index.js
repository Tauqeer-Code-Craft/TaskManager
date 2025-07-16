import express from "express";
import dotenv from "dotenv"
import connectdb from "./connectdb.js";
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import taskRoute from "./routes/task.route.js"
import reportRoute from "./routes/report.route.js"

dotenv.config({})

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello from app");
})

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/tasks',taskRoute);
app.use('/api/reports',reportRoute);

connectdb()
app.listen(PORT, () => {
    console.log(`Server Started at : http://localhost:${PORT}`);
})