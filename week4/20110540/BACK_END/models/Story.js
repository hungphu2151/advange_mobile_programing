const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Story = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    story_content: {
        publicId: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    create_story_time: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Story', Story);