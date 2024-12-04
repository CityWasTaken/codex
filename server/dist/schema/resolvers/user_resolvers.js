import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import User from "../../models/User.js";
import { errorHandler } from "../helpers/index.js";
import { GraphQLError } from "graphql";
const user_resolvers = {
    Query: {
        // Search for users
        async searchUser(_, args) {
            try {
                const { username } = args;
                const searchCriteria = {};
                if (username) {
                    searchCriteria.username = { $regex: username, $options: "i" }; // case-insensitive search
                }
                const users = await User.find(searchCriteria);
                return users;
            }
            catch (error) {
                errorHandler(error);
                throw new GraphQLError('Error searching for users');
            }
        },
        // Get all user posts
        async getAllUserPosts(_, args) {
            try {
                const posts = await Post.find({ user: args.user_id })
                    .populate({
                    path: 'comments',
                    select: 'commentText user',
                    populate: {
                        path: 'user',
                        select: 'username'
                    }
                });
                console.log(posts);
                return posts;
            }
            catch (error) {
                errorHandler(error);
                throw new GraphQLError('Failed to get user posts');
            }
        },
        async getCommentsForPost(_, args) {
            console.log(args);
            const comments = await Comment.find({
                post: args.post_id
            })
                .populate({
                path: 'user',
                select: 'username',
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
                console.log(error);
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
        async likePost(_, args, context) {
            const currentUser = context.req.user;
            if (!currentUser) {
                throw new Error('You must be logged in to like posts');
            }
            // Likes isn't a number, It's an array of users Ids
            const postId = await Post.findByIdAndUpdate(args.postId, { $addToSet: { likes: context.req.user._id } });
            return {
                message: 'Post liked successfully!',
                post: postId
            };
        },
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
        async followUser(_, { userId }, context) {
            const currentUser = context.req.user;
            if (!currentUser) {
                throw new Error('You must be logged in to follow users');
            }
            if (currentUser._id.toString() === userId) {
                throw new Error('You cannot follow yourself');
            }
            const userToFollow = await User.findById(userId);
            if (!userToFollow) {
                throw new Error('User not found');
            }
            if (!currentUser.following.includes(userId)) {
                currentUser.following.push(userId);
                await currentUser.save();
                userToFollow.followers.push(currentUser._id);
                await userToFollow.save();
            }
            return {
                message: 'You are now following this user!',
                userToFollow
            };
        },
        async unfollowUser(_, { userId }, context) {
            const currentUser = context.req.user;
            if (!currentUser) {
                throw new Error('You must be logged in to unfollow users');
            }
            const userToUnfollow = await User.findById(userId);
            if (!userToUnfollow) {
                throw new Error('User not found');
            }
            currentUser.following = currentUser.following.filter((id) => id.toString() !== userId);
            await currentUser.save();
            userToUnfollow.followers = userToUnfollow.followers.filter((id) => id.toString() !== currentUser._id.toString());
            await userToUnfollow.save();
            return {
                message: 'You are no longer following this user!',
                userToUnfollow
            };
        }
    }
};
export default user_resolvers;
