import express from "express";
import dotenv from "dotenv"
import connectdb from "./connectdb.js";

dotenv.config({})

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello from app");
})

connectdb()
app.listen(PORT, () => {
    console.log(`Server Started at : http://localhost:${PORT}`);
})