const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post_stored = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
})

module.exports = mongoose.model('Post_stored', Post_stored);