const gql = String.raw;
// The content field is needed to store the main body or text of the post. This is essential for a social media app as it represents the primary information that users create and interact with in response to posts.
const typeDefs = gql `
type User {
    _id: ID
    username: String!
    email: String!
    posts: [Post]
}

type Post {
    _id: ID
    title: String
    body: String
    author: User # The author of the post or comment, aka the User type
    likes: Int
    comments: [Comment]
}

type Comment {
    _id: ID
    body: String
    author: User 
    post: Post
}

type Response {
    user: User
    message: String
    errors: [String]
}


type Query {
<<<<<<< HEAD
    getAllPosts: [Post]
    getPostById(id: ID): Post # To get specific Post by it's ID
=======
    # Auth Queries
    getUser: Response
    # User Queries
    getAllUserPosts(user_id: ID): [Post]
    
},

# Mutation type defines the write operations
type Mutation {
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response
    # User Resolvers
    createPost(postText: String, user: ID): Response
>>>>>>> 2151c5b205c7a61a36ad7bce752fac634b7e05b5
}

type Mutation {
    createPost(title: String, content: String): PostResponse
    updatePost(id: ID, title: String, content: String): PostResponse
    deletePost(id: ID): PostResponse
    likePost(id: ID): PostResponse
    commentOnPost(postId: ID, body: String): PostResponse
}
`;
export default typeDefs;
