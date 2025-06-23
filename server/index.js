import express from "express"
import userRoute from "./routes/userRoutes.js"
import connectDB from "./db.js"
import cors from "cors"
import { redirectToOriginal } from "./controllers/userController.js"
import dotenv from "dotenv"

dotenv.config()
const app=express()

app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true 
}));
connectDB()
app.use("/api",userRoute)
app.get('/:shortCode', redirectToOriginal);

app.listen(process.env.PORT,()=>{
    console.log("Server is running.")
})