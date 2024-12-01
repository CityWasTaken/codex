const gql = String.raw;
const typeDefs = gql `

# User type represents a user in the System
type User {
<<<<<<< HEAD
    id: ID!
=======
    _id: ID
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
    username: String!
    email: String!
    posts: [Post] # List of posts created by the user

}

# Post type represents a post created by user
type Post {
<<<<<<< HEAD
    id: ID!
    content: String!
    author: User!
    comments: [Comment] # List of comments on the post

}

# Comment type represents a comment on a post
type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
}

=======
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

>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
# Query type defines the read operations
type Query {

    user: [User]
    posts: [Post]
    post(id: ID!): Post # Fetch a single post by it's ID

    # Auth Queries
    getUser: Response
    # User Queries
    # getAllPosts: [Post]

},

# Mutation type defines the write operations
type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createPost(content: String!): Post
    createComment(postId: ID!, content: String!): comment
    
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response
    # User Resolvers
}

`;
export default typeDefs;
