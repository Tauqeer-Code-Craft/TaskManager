import { text } from "express"
import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    text:{
        type: String,
        required:true
    },
    completed:{
        type: Boolean,
        default:false
    }
})

const taskSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    priority:{
        type: String,
        enum: ["Low","Medium","High"],
        default: "Medium"
    },
    status:{
        type: String,
        enum:["Pending","In Progress","Completed"],
        default:"Pending"
    },
    assignedTo:[{        
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    attachments: [{
        type: String
    }],
    todoChecklist:[todoSchema],
    progress:{
        type: Number,
        default: 0
    }

},{timestamps:true})

export const Task = mongoose.model("Task", taskSchema)