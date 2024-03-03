const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Follow = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    following_user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    follower_user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
})

module.exports = mongoose.model('Follow', Follow);