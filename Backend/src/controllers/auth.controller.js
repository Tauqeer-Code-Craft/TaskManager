import {User} from "../models/User.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "../utils/dataUri.js"; // assuming you fixed this path

//generate jwt token
const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET,{expiresIn: "7d"})
}


const registerUser = async (req, res) => {
  try {
    const { name, email, password, adminInviteToken } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Set default role
    let role = "member";
    if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
      role = "admin";
    }

    // Upload profile image to Cloudinary if provided
    let profileImageUrl = null;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const result = await cloudinary.uploader.upload(fileUri.content, {
        folder: "task-manager/users",
     });


      profileImageUrl = result.secure_url;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      profileImageUrl,
      role,
    });

    // Respond with token and user data
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req,res)=> {
    try { 
        const {email,password} = req.body;

        const user = await User.findOne({email})        

        if (!user) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            role : user.role,
            profileImageUrl : user.profileImageUrl,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({message: "Server error",error: error.message})
    }
}


const getUserProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({message: "Server error",error: error.message})
    }
}


const updatedUserProfile = async (req,res) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(req.body.password,salt)            
        }

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
        
    } catch (error) {
        res.status(500).json({message: "Server error",error: error.message})
    }
}

export default {registerUser, loginUser, getUserProfile, updatedUserProfile};