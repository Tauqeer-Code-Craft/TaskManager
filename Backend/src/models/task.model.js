import mongoose from "mongoose"
import { Project } from "./project.model.js";
import { User } from "./user.model.js";

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
    },
    assigneeId:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    creatorId:{
        type:[mongoose.Schema.Types.ObjectId],
        ref : "User",
    },
    status:{
        type: String,
        enum: ["ToDo","InProgress", "Completed"],
        required: true,
    },
    priority:{
        type: String,
        enum: ["Low","Medium","High"]
    },
    dueDate:{
        type: Date,

    },
    comments:[
        {
            userId: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: "User"
            },
            content: String,
            createdAt: Date,
        }
    ]
},{timestamps:true})

export const Task = mongoose.model("Task", taskSchema);