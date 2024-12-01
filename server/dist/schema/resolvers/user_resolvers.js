import Post from "../../models/Post.js";
import User from "../../models/User.js";
import { errorHandler } from "../helpers/index.js";
import { GraphQLError } from "graphql";
const user_resolvers = {
    Query: {
        // Get all user posts
        async getAllUserPosts(_, args) {
            try {
                const posts = await Post.find({ user: args.user_id });
                return posts;
            }
            catch (error) {
                errorHandler(error);
                throw new GraphQLError('Failed to get user posts');
            }
        }
    },
    Mutation: {
        // Create a post
<<<<<<< HEAD
        async createPost(_, args) {
=======
        async createPost(_, args, context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                };
            }
            try {
                const post = await Post.create(args);
                await User.findByIdAndUpdate(args.user, {
                    $push: {
                        posts: post._id
                    }
                });
                return {
                    message: 'Post was ACTUALLY added!'
                };
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
>>>>>>> 2151c5b205c7a61a36ad7bce752fac634b7e05b5
        }
        // Update a post
        // Delete a post
        // Like a post
        // Comment on a post
    }
};
export default user_resolvers;
