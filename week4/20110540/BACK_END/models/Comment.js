const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    comment_content: {
        type: String,
        required: true,
    },
    create_comment_time: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Comment', Comment);