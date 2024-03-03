const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Noti_user = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    detail:[{
        noti_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification',
            required: true,
        },
        read: {
            type: Boolean,
            default: false
        },
    }]
})

module.exports = mongoose.model('Noti_user', Noti_user);