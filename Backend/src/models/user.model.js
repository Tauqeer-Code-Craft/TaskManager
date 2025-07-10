import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Model({
    fullName: {
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
},
{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema)