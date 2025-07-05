import mongoose from "mongoose"
import { Project } from "./project.model.js";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    projectId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: Project
    }
})

export const Task = mongoose.model("Task", taskSchema);