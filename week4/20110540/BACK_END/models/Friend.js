const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Friend = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    friend_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
})

module.exports = mongoose.model('Friend', Friend);