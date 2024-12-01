import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
const { verify } = jwt;
dotenv.config();
export const authenticate = async ({ req, res }) => {
<<<<<<< HEAD
    const pet_token = req.cookies?.pet_token;
    if (pet_token) {
=======
    const codex_token = req.cookies?.codex_token;
    if (codex_token) {
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
        try {
            if (!process.env.JWT_SECRET) {
                console.log('MUST ADD JWT_SECRET TO .env!');
                return {
                    req: req,
                    res: res
                };
            }
<<<<<<< HEAD
            const userData = verify(pet_token, process.env.JWT_SECRET);
=======
            const userData = verify(codex_token, process.env.JWT_SECRET);
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
            if (!userData || typeof userData === 'string') {
                return {
                    req: req,
                    res: res
                };
            }
            const user = await User.findById(userData.user_id);
            req.user = user;
        }
        catch (error) {
            console.log('JWT VERIFICATION ERROR', error);
        }
    }
    return {
        req: req,
        res: res
    };
};
