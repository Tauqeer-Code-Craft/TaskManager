import jwt from "jsonwebtoken";
import {User} from "../models/User.model.js";

const protect = async (req,res,next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }else{
            res.status(401).json({message: "Not Authorized, no token"});
        }

    } catch (error) {
        res.status(401).json({message: "Token failed", error: error.message});
    }
}

const adminOnly = (req,res,next)=> {
    if (req.user && req.user.role === "admin") {
        next();
    }else{
        res.status(401).json({message: "Access denied, Admin only "})
    }
};

export default {protect, adminOnly};