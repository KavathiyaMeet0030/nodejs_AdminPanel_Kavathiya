const path = require('path');
const BlogSchema = require('../models/blogmodel');
const Commentmodel = require('../models/commentmodel');
const fs = require('fs');


const addblogUser = async (req, res) => {


    console.log("ADD BLOG POST CONTROLLER");

    const title = req.body.blogtitle;
    const content = req.body.blogcontent;
    const image = req.file ? `uploadsFile/${req.file.filename}` : null;

    const blog = new BlogSchema({
        title,
        content,
        image
    });

    await blog.save();

    console.log("blog", blog);

    res.redirect('/');

}

//AllBlogsController

const AllBlogsController = async (req, res) => {
    console.log("All Blog Views");

    // Correct the populate field to 'comments' instead of 'Comment'
    const blogs = await BlogSchema.find()
        .populate('user', 'fname')  // Populate user field
        .populate({ 
            path: 'comments',       // Populate the 'comments' field (not 'Comment')
            populate: { 
                path: 'user', 
                select: 'fname'      // Populate user field in comments
            }
        });

    console.log("All Blogs", blogs);
    res.render('allblog', { blogs });
};

   
   



const viewblogs = async (req, res) => {

    console.log("my blogs");
    const blogs = await BlogSchema.find();
    res.render('myblog', { blogs });

}

//editblog

const editblog = async (req, res) => {
    console.log("edit blog");


    const Blog = await BlogSchema.findOne({ _id: req.params.id });
    console.log("EDIT BLOG : ", Blog);
    res.render('editBlog', { Blog });

}

//updateblog

const updateblog = async (req, res) => {

    console.log("updat blog render");
    const blog = await BlogSchema.findById(req.params.id);

    if (blog.image) {
        try {
            await fs.unlink(path.join(__dirname, '..', blog.image));
        } catch (err) {
            console.error("ERROR : ", err);
        }
    }

    blog.title = req.body.blogupdatetitle;
    blog.content = req.body.blogupdatecontent;

    if (req.file) {
        blog.image = `uploadsFile/${req.file.filename}`;
    }

    await blog.save();
    console.log("update blog ", blog);

    res.redirect('/');

}


const deleteblog = async (req, res) => {

    console.log("delete blog");

    const blog = await BlogSchema.findById(req.params.id);

    if (blog.image) {
        try {
            await fs.unlink(path.join(__dirname, '..', blog.image));
        } catch (err) {
            console.error("ERROR : ", err);
        }
    }

    await BlogSchema.findByIdAndDelete(req.params.id);
    console.log("DELETED BLOG : ", blog);

    res.redirect('/');


}


module.exports = { addblogUser, AllBlogsController, viewblogs, updateblog, editblog, deleteblog }