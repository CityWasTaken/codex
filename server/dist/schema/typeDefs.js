const gql = String.raw;
const typeDefs = gql `

type Post {
    _id: ID
    title: String
    body: String

}



type User {
    _id: ID
    username: String
    email: String

}

type Response {
    user: User
    errors: [String]
    message: String
}

type Query {
    # Auth Queries
    getUser: Response
    # User Queries
    getAllPosts: [Post]

},


type Mutation {
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response
    # User Resolvers

}

`;
export default typeDefs;
