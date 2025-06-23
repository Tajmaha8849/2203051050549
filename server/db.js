import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config(); 
const connectDB=async()=>{
    try{
        const res=await mongoose.connect(process.env.MONGO_URI)
        if(res){
            console.log("database connected")
        }else{
            console.log("Not connected")
        }

    }catch(error){
        console.log("Not connected error"+error)
    }
}

export default connectDB