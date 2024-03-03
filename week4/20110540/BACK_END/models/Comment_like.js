const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment_liked = new Schema({
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    },
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }], 
})

module.exports = mongoose.model('Comment_liked', Comment_liked);