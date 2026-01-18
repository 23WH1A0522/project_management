import dotenv from "dotenv";
import { connectMongoose } from "./config/connect.js";

dotenv.config({ path: "../.env" });

connectMongoose();
