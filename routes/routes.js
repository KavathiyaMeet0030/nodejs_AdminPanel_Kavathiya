const express = require('express');
const controlToRoute = require('../controllers/controller')
const routes = express.Router();
const passport = require('../config/passport');
const isAuth = require('../Middleware/IsAuth');
const topic = require('../controllers/topic');
const blog = require('../controllers/blog');
const upload = require('../config/multer');
const comment = require('../controllers/comment');



routes.get('/',isAuth, controlToRoute.defaultController);
routes.get('/signup',controlToRoute.signupController);
routes.post('/signup', controlToRoute.postSignupController);
routes.get('/login',controlToRoute.loginController);
routes.post('/login',passport.authenticate('local', { failureRedirect: '/login' }) ,controlToRoute.PostLoginController);
routes.get('/logout',controlToRoute.logoutController);
routes.get('/addblog',controlToRoute.addblogController);
routes.get('/forgetpass',controlToRoute.forgetpassController);
routes.get('/changepass',controlToRoute.changepasswordController);
routes.get('/otpvalidate/:id',controlToRoute.otpvalidate);
routes.post('/updatepass',controlToRoute.updatepasswordController);
routes.post('/checkuser',controlToRoute.checkuser);
routes.post('/resetpassword/:id',controlToRoute.resetpassword);
routes.post('/resetpassUpdate/:id',controlToRoute.resetpassUpdate);
routes.get ('/addtopic',topic.addtopic);
routes.get ('/addSubtopic',topic.addSubtopic);
routes.get ('/viewTopic',topic.viewTopic);
routes.get ('/deleteTopic/:id',topic.deleteTopic);
routes.post ('/addTopicsUser',topic.addTopicsUser);
routes.post ('/addsubtopicuser',topic.addsubtopicuser);
routes.post ('/addblogUser',upload.single('blogimage'),blog.addblogUser);
routes.get('/editBlog/:id', blog.editblog);
routes.post ('/updateBlog/:id',upload.single('blogupdateimage'), blog.updateblog);
routes.get('/deleteBlog/:id', blog.deleteblog);

routes.get('/allBlogs', blog.AllBlogsController);
routes.get('/viewblogs', blog.viewblogs);



routes.post('/allBlogs/:id', comment.addcomment);











module.exports = routes;