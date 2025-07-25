import { Task }from "../models/Task.model.js"
import { User } from "../models/User.model.js"
import bcrypt from "bcrypt"


const getUsers = async (req,res) => {
    try {
        
        const users = await User.find({role: "member"}).select("-password");
        
        //Add task counts to each user
        const pendingTasks = await Task.countDocuments({
            assignedTo: User._id,
            status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
            assignedTo :User._id,
            status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
            assignedTo: User._id,
            status: "Completed"
        })

        return {
            ...users._doc,
            pendingTasks,
            inProgressTasks,
            completedTasks
        }

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const getUserById = async (req,res) => {
    try {
        
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message:"User not found"});
        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

const deleteUser = async (req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        
    }
}

export default { getUsers, getUserById, deleteUser}