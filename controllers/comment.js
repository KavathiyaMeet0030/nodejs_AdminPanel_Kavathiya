const Comment = require('../models/commentmodel');

const addcomment = async(req,res) =>{

    console.log("add comment routes");

    try {
        const newComment = new Comment({
            blogId: req.params.id, 
            user: req.user._id,    
            content: req.body.comment 
        });
  
        console.log("newComment" ,newComment);
        await newComment.save();

        res.redirect('/allBlogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

}

module.exports = {addcomment};