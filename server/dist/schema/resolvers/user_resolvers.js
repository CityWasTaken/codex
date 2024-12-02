import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import User from "../../models/User.js";
import { errorHandler } from "../helpers/index.js";
import { GraphQLError } from "graphql";
// type DeletePostArgs = {
//     postId: Types.ObjectId;
// }
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
        },
        async getCommentsForPost(_, args) {
            const comments = Comment.find({
                post: args.post_id
            });
            return comments;
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

        // async deletePost(_: any, args: DeletePostArgs, context: Context) {
        // }
        // Like a post

        // Comment on a post
        async createComment(_, args, context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                };
            }
            try {
                const comment = await Comment.create(args);
                await Post.findByIdAndUpdate(args.post, {
                    $push: {
                        comments: comment._id
                    }
                });
                await User.findByIdAndUpdate(args.user, {
                    $push: {
                        comments: comment._id
                    }
                });
                return {
                    message: 'Comment was ACTUALLY added!'
                };
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },
    }
};
export default user_resolvers;
