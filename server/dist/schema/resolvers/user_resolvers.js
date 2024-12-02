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
        },
        // Update a post
        async updatePost(_, args, context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                };
            }
            try {
                const updatedPost = await Post.findByIdAndUpdate(args.postId, {
                    postText: args.postText
                }, { new: true });
                if (!updatedPost) {
                    throw new GraphQLError('Post not found');
                }
                return {
                    message: 'Post updated Successfully!',
                    post: updatedPost
                };
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },
        // Delete a post
        async deletePost(_, args, context) {
            if (!context.req.user) {
                return {
                    errors: ['You are Not authorized to perform this action']
                };
            }
            try {
                const deletePost = await Post.findByIdAndDelete(args.postId);
                if (!deletePost) {
                    throw new GraphQLError('Post not found');
                }
                return {
                    message: 'Post deleted successfully!',
                    post: deletePost
                };
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },
        // Like a post
        // Comment on a post
    }
};
export default user_resolvers;
