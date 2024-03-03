const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Addfriend = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    add_user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
})

module.exports = mongoose.model('Addfriend', Addfriend);