import express from "express";
import dotenv from "dotenv"

dotenv.config({})

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello from app");
})

app.listen(PORT, () => {
    console.log("Server Started at : http://localhost:3000/");
})