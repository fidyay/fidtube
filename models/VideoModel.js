const mongoose = require('mongoose')
const { Schema, model } = mongoose 


const videoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    comments: {
        type: Array,
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    author: { 
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    source: {
        type: String,
        default: null
    },
    votedBy: {
        type: Array,
        default: []
    },
    preview: {
        type: String,
        default: null
    }
})

const VideoModel = model('Video', videoSchema)

module.exports = VideoModel