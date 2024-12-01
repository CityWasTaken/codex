import { Types } from "mongoose"

import Post from "../../models/Post"
import Context from "../../interfaces/Context"

import { errorHandler } from "../helpers/index.js"
import { GraphQLError } from "graphql"

const user_resolvers = {

    Query: {

        // Get all posts

    },

    Mutation: {


        // Create a post
        async createPost() {

        }

        // Update a post


        // Delete a post


        // Like a post


        // Comment on a post
    }
}

export default user_resolvers