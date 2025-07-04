import mongoose from 'mongoose';

const userSchema = new mongoose.Model({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require:true,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        unique:true,
    }
})

export const UserModel = mongoose.model("UserModel", userSchema)