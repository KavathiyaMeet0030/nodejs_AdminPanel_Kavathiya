
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

    image:{
        type: String
    }

})

const Blog = mongoose.model('Blogs', BlogSchema);
module.exports = Blog;








