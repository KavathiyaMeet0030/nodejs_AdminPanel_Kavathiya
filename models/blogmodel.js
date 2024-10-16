
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },

    content:{
        type: String,
        required: true
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    }],

    user: { // Add this field
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    image:{
        type: String
    }

})

const Blog = mongoose.model('Blogs', BlogSchema);
module.exports = Blog;








