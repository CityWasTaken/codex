const gql = String.raw;
<<<<<<< HEAD
// The content field is needed to store the main body or text of the post. This is essential for a social media app as it represents the primary information that users create and interact with in response to posts.
const typeDefs = gql `
=======
const typeDefs = gql `

# User type represents a user in the System
>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
type User {
    _id: ID
    username: String!
    email: String!
<<<<<<< HEAD
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
    getAllPosts: [Post]
    getPostById(id: ID): Post # To get specific Post by it's ID
}

type Mutation {
    createPost(title: String, content: String): PostResponse
    updatePost(id: ID, title: String, content: String): PostResponse
    deletePost(id: ID): PostResponse
    likePost(id: ID): PostResponse
    commentOnPost(postId: ID, body: String): PostResponse
}
=======
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
    # getAllPosts: [Post]

},

# Mutation type defines the write operations
type Mutation {
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response
    # User Resolvers
}

>>>>>>> 806be707472eaf77ba47a72f24368c52e334fb06
`;
export default typeDefs;
