const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/routes')
const env = require('dotenv');
env.config();

const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mypath = path.join(__dirname, '/views');
const database = require('./config/db');
const passport = require('./config/passport')
const cookieParser = require('cookie-parser');
    

app.set('view engine', 'ejs');


app.use(require('express-session')({ secret: 'meet', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploadsFile', express.static(path.join(__dirname, 'uploadsFile')));

app.use(express.static(mypath));


// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());


// Use the routes
app.use('/', router);


// app.get('/', (req, res)=>{
//     res.render('Hello, I am .')
// })






    

app.listen(PORT, (error)=>{
    if(!error){
        console.log(`Server Running on http://localhost:${PORT}`);
    }
});