const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post_liked = new Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
})

module.exports = mongoose.model('Post_liked', Post_liked);