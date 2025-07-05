import mongoose from "mongoose";
import { User } from "./user.model.js";

const projectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required: true,

    },
    description:{
        type: String,
        required: true
    },
    member:{
        Types: [mongoose.Schema.Types.ObjectId],
        ref: "User"
        }
},{timestamps:true})

export const Project = mongoose.model("Project", projectSchema)