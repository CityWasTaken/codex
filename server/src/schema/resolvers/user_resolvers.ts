import { Post } from "../../models/Post";


const user_resolvers = {
    Query: {
    // Get all posts
        async getAllPost() {
            try {
                const posts = await Post.find();
            }
        }
    },
    
    
    // Create a post
    
    
    
    // Update a post
    
    
    // Delete a post
    
    
    // Like a post
    
    
    // Comment on a post
    
}

export default user_resolvers