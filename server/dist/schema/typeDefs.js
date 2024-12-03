const gql = String.raw;
// The content field is needed to store the main body or text of the post. This is essential for a social media app as it represents the primary information that users create and interact with in response to posts.
const typeDefs = gql `
type User {
    _id: ID
    username: String!
    email: String!
    posts: [Post]
    following: [User]
    followers: [User]
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
    # Auth Queries
    getUser: Response
    # User Queries
    getAllUserPosts(user_id: ID): [Post]
    getCommentsForPost(post_id: ID): [Comment]
    
},

# Mutation type defines the write operations
type Mutation {
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response
    # User Resolvers
    createPost(postText: String, user: ID): Response
    updatePost(postId: ID, postText: String): Response
    deletePost(postId: ID): Response
    likePost(postId: ID): Response
    createComment(commentText: String, post: ID, user: ID): Response
    followUser(userId: ID!): Response
    unfollowUser(userId: ID!): Response
}
`;
export default typeDefs;
