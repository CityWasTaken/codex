import User from "../../models/User.js";
// import { errorHandler } from "../helpers/index.js"
// import { GraphQLError } from "graphql"
const public_resolvers = {
    Query: {
        async getUserInfo(_, args) {
            const user = await User.findOne({
                username: args.username
            })
                .select('_id username posts following followers')
                .populate('followers')
                .populate('following');
            return {
                user: user
            };
        }
    }
};
export default public_resolvers;
