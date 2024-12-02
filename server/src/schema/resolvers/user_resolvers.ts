import { Types } from "mongoose"

import Post from "../../models/Post.js"
import Comment from "../../models/Comment.js"
import User from "../../models/User.js"
import Context from "../../interfaces/Context"

import { errorHandler } from "../helpers/index.js"
import { GraphQLError } from "graphql"

type PostArgs = {
    postText: string;
    comments?: [Comment];
    user: Types.ObjectId;
}

type UpdatePostArgs = {
    postId: Types.ObjectId;
    postText?: string;
}


type DeletePostArgs = {
    postId: Types.ObjectId;
}

type LikePostArgs = {
    postId: Types.ObjectId;
}

type CommentArgs = {
    commentText: string;
    post: Types.ObjectId;
    user: Types.ObjectId;
}

const user_resolvers = {

    Query: {
        // Get all user posts
        async getAllUserPosts(_: any, args: { user_id: Types.ObjectId }) {
            try {
                const posts = await Post.find({ user: args.user_id });
                return posts;
            } catch (error) {
                errorHandler(error);
                throw new GraphQLError('Failed to get user posts');
            }

        },

        async getCommentsForPost(_: any, args: {post_id: Types.ObjectId}) {
            const comments = Comment.find({
                post: args.post_id
            });

            return comments;
        }
    },

    Mutation: {


        // Create a post
        async createPost(_: any, args: PostArgs, context: Context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                }
            } try {
                const post = await Post.create(args);

                await User.findByIdAndUpdate(args.user, {
                    $push: {
                        posts: post._id
                    }
                });

                return {
                    message: 'Post was ACTUALLY added!'
                }
            } catch (error) {
                const errorMessage = errorHandler(error);

                throw new GraphQLError(errorMessage);
            }

        },

        // Update a post
        async updatePost(_: any, args: UpdatePostArgs, context: Context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                }
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
                }
            } catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },


        

        // Delete a post
        async deletePost(_: any, args: DeletePostArgs, context: Context) {
            if (!context.req.user) {
                return {
                    errors: ['You are Not authorized to perform this action']
                }
            }
            try {
                const deletePost = await Post.findByIdAndDelete(args.postId);

                if (!deletePost) {
                    throw new GraphQLError('Post not found');
                }

                return {
                    message: 'Post deleted successfully!',
                    post: deletePost
                }
            } catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },


        // Like a post
        async likePost(_: any, args: LikePostArgs, context: Context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                }
            }
            try {
                const likedPost = await Post.findByIdAndUpdate(args.postId, {
                    $inc: {likes: 1}
                }, {new: true});

                if (!likedPost) {
                    throw new GraphQLError('Post not found');
                }

                return {
                    message: 'Post liked successfully!',
                    post: likedPost
                }
            } catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },

        // Comment on a post
        async createComment(_: any, args: CommentArgs, context: Context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                }
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
                }
            } catch (error) {
                const errorMessage = errorHandler(error);

                throw new GraphQLError(errorMessage);
            }
        },

        followUser: async (_: any, { userId }: { userId: string }, context: Context) => {
            const currentUser = context.req.user;
            if (!currentUser) {
                throw new Error('You must be logged in to follow users');
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

        unfollowUser: async (_: any, { userId }: { userId: string }, context: Context) => {
            const currentUser = context.req.user;
            if (!currentUser) {
                throw new Error('You must be logged in to unfollow users');
            }

            const userToUnfollow = await User.findById(userId);
            if (!userToUnfollow) {
                throw new Error('User not found');
            }

            currentUser.following = currentUser.following.filter((id: Types.ObjectId) => id.toString() !== userId);
            await currentUser.save();

            userToUnfollow.followers = userToUnfollow.followers.filter((id: Types.ObjectId) => id.toString() !== currentUser._id.toString());
            await userToUnfollow.save();

            return {
                message: 'You are no longer following this user!',
                userToUnfollow
            };
        }
    }
}

export default user_resolvers;