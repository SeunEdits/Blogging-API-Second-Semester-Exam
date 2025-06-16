const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    authorID: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        enum: ['draft','published'],
        default: 'draft',
        required: true
    },
    read_count: {
        type: Number,
        default: 0
    },
    read_time: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array
    },
    body : {
        type: String,
        required: true
    },
    time_stamp : {
        type: Date,
        required: Date.now()
    }

});

const Blogs = mongoose.model('Blogs', blogsSchema);

module.exports = Blogs