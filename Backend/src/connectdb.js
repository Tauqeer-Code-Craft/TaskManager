import mongoose from "mongoose";

const connectdb =()=>{ 
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("DB connected successfully"))
    .catch((err)=> err.message);
}

export default connectdb;