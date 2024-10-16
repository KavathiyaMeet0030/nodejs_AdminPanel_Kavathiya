const Blog = require('../models/blogmodel');
const Comment = require('../models/commentmodel');

const addcomment = async(req,res) =>{

    console.log("add comment routes");
    const blogId = req.params.id;

    try {
        const newComment = new Comment({
            blogId: req.params.id, 
            user: req.user._id,    
            content: req.body.comment 
        });
  
        console.log("newComment" ,newComment);
        await newComment.save();

        await Blog.findByIdAndUpdate(blogId, { $push: {comments: newComment._id} });

        res.redirect('/allBlogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

}

module.exports = {addcomment};