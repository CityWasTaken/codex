const gql = String.raw;

const typeDefs = gql `

# User type represents a user in the System
type User {
    _id: ID
    username: String!
    email: String!
    posts: [Post] # List of posts created by the user

}

# Post type represents a post created by user
type Post {
    _id: ID
    postText: String
    comments: [Comment] #List of comments created by a user
}


# Comment type represents a comment on a post
type Comment {
    _id: ID
    commentText: String
    post: Post
}


type Response {
    user: User
    errors: [String]
    message: String
}

# Query type defines the read operations
type Query {
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
}

`;

export default typeDefs;