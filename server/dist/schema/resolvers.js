import dotenv from 'dotenv';
// import { Types } from 'mongoose';
dotenv.config();
import auth_resolvers from './resolvers/auth_resolvers.js';
<<<<<<< HEAD
=======
// import user_resolvers from './resolvers/user_resolvers.js';
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
// import User from '../models/User.js';
// import Context from '../interfaces/Context';
// import { User as UserInterface } from '../interfaces/User';
const resolvers = {
    Query: {
        ...auth_resolvers.Query,
<<<<<<< HEAD
    },
    Mutation: {
        ...auth_resolvers.Mutation,
=======
        // ...user_resolvers.Query
    },
    Mutation: {
        ...auth_resolvers.Mutation,
        // ...user_resolvers.Mutation
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
    }
};
export default resolvers;
