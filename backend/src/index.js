import dotenv from "dotenv";
import { connectMongoose } from "./config/connect.js";
import express from "express";

dotenv.config();
const app = express();

app.listen(3000,() =>{
    console.log("Server is running on port 3000")
})

connectMongoose();
