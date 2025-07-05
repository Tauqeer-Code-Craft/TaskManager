import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required: true,

    },
    description:{
        type: String,
        required: true
    }
},{timestamps:true})

export const Project = mongoose.model("Project", projectSchema)