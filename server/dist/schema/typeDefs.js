const gql = String.raw;
const typeDefs = gql `

# User type represents a user in the System
type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post] # List of posts created by the user

}

# Post type represents a post created by user
type Post {
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

# Query type defines the read operations
type Query {

    user: [User]
    posts: [Post]
    post(id: ID!): Post # Fetch a single post by it's ID

    # Auth Queries
    getUser: Response
    # User Queries
    getAllPosts: [Post]

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
