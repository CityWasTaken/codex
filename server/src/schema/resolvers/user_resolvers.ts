import { Types } from "mongoose"

<<<<<<< HEAD
// // import { Post, Comment } from '../../models/Post'
=======
import Post from "../../models/Post"
import Context from "../../interfaces/Context"

import { errorHandler } from "../helpers/index.js"
import { GraphQLError } from "graphql"

type PostArgs = {
    postText: string,
    comments?: 
}
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06

// const user_resolvers = {

<<<<<<< HEAD
//     // Get all posts
    
    
//     // Create a post
    
    
//     // Update a post
    
//     // 
//     // Delete a post
    
    
//     // Like a post
    
    
//     // Comment on a post
    
// }
=======
    Query: {

        // Get all posts

    },

    Mutation: {


        // Create a post
        async createPost(_: any, args: ) {

        }

        // Update a post


        // Delete a post


        // Like a post


        // Comment on a post
    }
}
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06

// export default user_resolvers