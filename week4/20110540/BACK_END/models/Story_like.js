const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Story_like = new Schema({
    story_id: {
        type: String,
        required: true,
    },
    user_id: [{
        type: String,
        required: true,
    }],
})

module.exports = mongoose.model('Story_like', Story_like);