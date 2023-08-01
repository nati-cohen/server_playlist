const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    thumbnail: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration_formatted:{
        type: String,
        required:true
    },
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
    
})

const songModel = mongoose.model("song",songSchema)

module.exports = songModel