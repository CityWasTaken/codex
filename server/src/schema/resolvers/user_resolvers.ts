import { Types } from "mongoose"

import Post from "../../models/Post.js"
import User from "../../models/User.js"
import Context from "../../interfaces/Context"

import { errorHandler } from "../helpers/index.js"
import { GraphQLError } from "graphql"

type PostArgs = {
    postText: string;
    comments?: [Comment];
    user: Types.ObjectId;
}

const user_resolvers = {

    Query: {
        // Get all user posts
        async getAllUserPosts(_: any, args:{ user_id: Types.ObjectId}) {
            try {
                const posts = await Post.find({ user: args.user_id});
                return posts;
            } catch (error) {
                errorHandler(error);
                throw new GraphQLError('Failed to get user posts');
            }           
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
            } catch(error) {
                const errorMessage = errorHandler(error);

                throw new GraphQLError(errorMessage);
            }

        }

        // Update a post
        

        // Delete a post
        

        // Like a post


        // Comment on a post
    }
}

export default user_resolvers