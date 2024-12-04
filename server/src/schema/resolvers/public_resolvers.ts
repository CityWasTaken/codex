import { Types } from "mongoose";
import User from "../../models/User.js"
import Comment from "../../models/Comment.js";

// import { errorHandler } from "../helpers/index.js"
// import { GraphQLError } from "graphql"


const public_resolvers = {

  Query: {
    async getUserInfo(_: any, args: { username: string; }) {
      const user = await User.findOne({
        username: args.username
      })
        .select('_id username posts following followers')
        .populate('followers')
        .populate('following')
        .populate('posts');
        

      return {
        user: user
      }
    },

    async getCommentsForPost(_: any, args: { post_id: Types.ObjectId }) {
      const comments = Comment.find({
        post: args.post_id
      });

      return comments;
    }

  }
}
export default public_resolvers;