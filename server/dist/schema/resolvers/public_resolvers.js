import User from "../../models/User.js";
// import { errorHandler } from "../helpers/index.js"
// import { GraphQLError } from "graphql"
const public_resolvers = {
    Query: {
        async getUserInfo(_, args) {
            const user = await User.findOne({
                username: args.username
            })
                .select('_id username posts following followers')
                .populate('followers')
                .populate('following')
                .populate({
                path: 'posts',
                populate: [
                    {
                        path: 'user',
                        select: 'username'
                    },
                    {
                        path: 'comments',
                        select: 'commentText user',
                        populate: {
                            path: 'user',
                            select: 'username'
                        }
                    }
                ]
            });
            return {
                user: user
            };
        }
    }
};
export default public_resolvers;
