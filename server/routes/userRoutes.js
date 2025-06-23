import express from "express"
import {register,login,createShortUrl,getUserUrls} from "../controllers/userController.js"
import verifyToken from "../middleware/middleware.js"


const routes=express.Router()

routes.post("/register",register)
routes.post("/login",login)
routes.post("/shorturls", verifyToken, createShortUrl); 


export default routes

