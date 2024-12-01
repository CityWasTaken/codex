import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/pet_social_network_db');
=======
mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/codex_db');
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
export default mongoose.connection;
