import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
dotenv.config();
import User from '../../models/User.js';
import { errorHandler } from '../helpers/index.js';
const { sign } = jwt;
function createToken(user_id) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return sign({ user_id: user_id }, process.env.JWT_SECRET);
}
const auth_resolvers = {
    Query: {
        // Get user
        async getUser(_, __, context) {
            if (!context.req.user) {
                return {
                    user: null
                };
            }
            return {
                user: context.req.user
            };
        }
    },
    Mutation: {
        // Register a user
        async registerUser(_, args, context) {
            console.log(args);
            try {
                const user = await User.create(args);
                const token = createToken(user._id);
<<<<<<< HEAD
                context.res.cookie('pet_token', token, {
=======
                context.res.cookie('codex_token', token, {
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
                    // Purpose: This setting ensures that the cookie is only accessible through HTTP(S) requests and not via client-side JavaScript.
                    // Security Benefit: It helps mitigate the risk of cross-site scripting (XSS) attacks by preventing malicious scripts from accessing the cookie's value.
                    httpOnly: true,
                    // Purpose: This setting ensures that the cookie is only sent over secure HTTPS connections.
                    // Security Benefit: It prevents the cookie from being transmitted over unencrypted HTTP connections, reducing the risk of man-in-the-middle attacks. The condition process.env.PORT ? true : false checks if the PORT environment variable is set, which might indicate a production environment where HTTPS is used.
                    secure: process.env.PORT ? true : false,
                    // Purpose: This setting controls whether the cookie is sent with cross-site requests.
                    // Security Benefit: It helps prevent cross-site request forgery (CSRF) attacks by ensuring that the cookie is only sent with requests originating from the same site. Setting sameSite: true is equivalent to sameSite: 'strict', which means the cookie will not be sent with any cross-site browsing context.
                    sameSite: true
                });
                return {
                    user: user
                };
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },
        // Log a user in
        async loginUser(_, args, context) {
            const user = await User.findOne({
                email: args.email
            });
            if (!user) {
                throw new GraphQLError('No user found with that email!');
            }
            const valid_pass = await user.validatePassword(args.password);
            if (!valid_pass) {
                throw new GraphQLError('Password is invalid');
            }
            const token = createToken(user._id);
<<<<<<< HEAD
            context.res.cookie('pet_token', token, {
=======
            context.res.cookie('codex_token', token, {
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
                httpOnly: true,
                secure: process.env.PORT ? true : false,
                sameSite: true
            });
            return {
                user: user
            };
        },
        // Log out user
        logoutUser(_, __, context) {
<<<<<<< HEAD
            context.res.clearCookie('pet_token');
=======
            context.res.clearCookie('codex_token');
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
            return {
                user: null
            };
        }
    }
};
export default auth_resolvers;
