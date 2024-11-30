import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/codex_db');
export default mongoose.connection;
