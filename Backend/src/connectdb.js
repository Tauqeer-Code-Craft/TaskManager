import mongoose from "mongoose";

const connectdb =()=>{ 
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("DB connected successfully"))
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
});
}

export default connectdb;