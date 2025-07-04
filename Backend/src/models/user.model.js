import mongoose from 'mongoose';

const userSchema = new mongoose.Model({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    }
})

export const UserModel = mongoose.model("UserModel", userSchema)