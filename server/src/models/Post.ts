import mongoose from "mongoose";

const {Schema, model} = mongoose;

const postSchema = new Schema({
    postText: {
        type: String,
        minLength: [3, 'Your post must be at least 3 characters in length']
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'You must attatch the user _id to the post'],
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
}, {
    collection: 'posts'
});

const Post = model('Post', postSchema);

export default Post;