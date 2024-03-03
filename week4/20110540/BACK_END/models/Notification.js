const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Notification = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    noti_content: {
        type: String,
        required: true,
    },
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    add_user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    noti_create_time: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Notification', Notification);