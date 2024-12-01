const user_resolvers = {
    Query: {
<<<<<<< HEAD
        // Get all posts
        async getAllPost() {
            try {
                const posts = await Post.find();
            }
            finally {
            }
        }
    },
    // Create a post
    // Update a post
    // Delete a post
    // Like a post
    // Comment on a post
=======
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
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
};
export default user_resolvers;
