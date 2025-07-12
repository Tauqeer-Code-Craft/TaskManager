import { Task } from "../models/Task.model";

const getTasks = async(req,res) => {
    try {
        
    } catch (error) {
        res.status(500).send({ message: "Server error",error: error.message});
    }
}

const getTasksById = async(req,res) => {
    try {
        
    } catch (error) {
        res.status(500).send({ message: "Server error",error: error.message});
    }
}

const createTask = async(req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).send({ message: "Server error",error: error.message});
    }
}

const updateTask = async(req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).send({ message: "Server error",error: error.message});
    }
}

const deleteTask = async(req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).send({ message: "Server error",error: error.message});
    }
}

const updateTaskStatus = async(req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).send({ message: "Server error",error: error.message});
    }
}

const getDashboardData = async(req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).send({ message: "Server error",error: error.message});
    }
}

const getUserDashboardData = async(req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).send({ message: "Server error",error: error.message});
    }
}

const updateTaskChecklist = async(req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).send({ message: "Server error",error: error.message});
    }
} 

export default {getTasks, getTasksById, createTask,updateTask,deleteTask,updateTaskStatus,getDashboardData,getUserDashboardData,getUserDashboardData, updateTaskChecklist}