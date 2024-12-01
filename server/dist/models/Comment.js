import mongoose from "mongoose";
const { Schema, model } = mongoose;
const commentSchema = new Schema({
    commentText: {
        type: String,
        minLength: [3, 'Your comment must be at least 3 characters in length']
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'You must attatch the user _id to the comment'],
        ref: 'User'
    }
});
const Comment = model('Post', commentSchema);
export default Comment;
