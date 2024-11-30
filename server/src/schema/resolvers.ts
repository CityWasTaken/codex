import dotenv from 'dotenv';

// import { Types } from 'mongoose';

dotenv.config();

import auth_resolvers from './resolvers/auth_resolvers.js';
// import user_resolvers from './resolvers/user_resolvers.js';



// import User from '../models/User.js';
// import Context from '../interfaces/Context';
// import { User as UserInterface } from '../interfaces/User';




const resolvers = {
    Query: {
        ...auth_resolvers.Query,
        // ...user_resolvers.Query
    },

    Mutation: {
        ...auth_resolvers.Mutation,
        // ...user_resolvers.Mutation
    }
        
};

export default resolvers;