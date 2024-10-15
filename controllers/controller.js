
const userModel = require('../models/userModel');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let MyOTP = null;
const nodemailer = require('nodemailer');

let configOptions = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user:"kavathiyameet7603@gmail.com",
      pass:"cydbrltoqlkrnkgx"
    }
})



const defaultController = async (req, res) => {


    res.render('index');

}




// Sign Up Form Submission Process

const signupController = (req, res) => {
    if (req.isAuthenticated()) {

        res.redirect('/')
    }
    res.render('signup');
}
const postSignupController = async (req, res) => {
    if (req.body.password === req.body.con_pass) {
        // console.log("hello",req.body);
        const hash = await bcrypt.hash(req.body.password, saltRounds)
        // Store hash in your password DB.
        console.log("bcrypt passsss", hash);

        const userData = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hash
        }

        console.log('====================================');
        console.log("userModel", userModel);
        console.log('====================================');
        const newData = new userModel(userData)
        await newData.save();
        console.log("newDATA", newData);

        res.cookie('id', newData._id);
        res.redirect('/login');

    } else {
        console.log("could not found form data..");
    }
}





// Login Form Submit Process


const loginController = (req, res) => {
    if (req.isAuthenticated()) {

        res.redirect('/')
    }
    res.render('login');
}


const PostLoginController = async (req, res) => {
    console.log("Login Pending..");

    res.redirect('/');
}

const logoutController = (req, res) => {

    console.log("Logout");
    req.logout((err) => {
        if (err) {
            next()
        }

        res.redirect('/login')
    })

}

//addblog 

const addblogController = (req, res) => {
    console.log("AddBlog Render");

    res.render('addblog');

}

//forgetpassController

const forgetpassController = (req, res) => {

    console.log("Forget Password");

    res.render('ForgetPass');

}

//changepasswordController

const changepasswordController = (req, res) => {

    console.log("change Password");

    res.render('changepass');


}

//updatepasswordController

const updatepasswordController = (req, res) => {
    console.log("update Password");

    const { password } = req.user;
    const { cun_password, new_password, con_password } = req.body;

    bcrypt.compare(password, cun_password, (err, result) => {

        if (new_password == con_password) {
            console.log('password is match');
            bcrypt.hash(new_password, saltRounds, async (err, hash) => {

                if (err) {
                    console.log(err);
                    res.redirect('/changepass');
                } else {

                    let updatep = await modelsmsg.updateOne({ _id: req.user._id }, { password: hash })

                    console.log("hash change", updatep);

                    res.redirect('/logout');
                }




            })
        } else {
            console.log('password is not match');
            res.redirect('/changepass');
        }

    })
}

//checkuser
const checkuser = async (req, res) => {

    console.log("checkuser");

    const { userName } = req.body;

    const userData = await userModel.findOne({ email: userName })
    console.log(userData);

    let link = `http://localhost:3070/resetpassUpdate/${userData.email}`

    let otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

     MyOTP = otp;

    console.log("OTP", MyOTP);

    const Mail = {
        from: 'kavathiyameet7603@gmail.com',
        to:userData.email,
        subject:'Forget Password OTP',
        text:`Your OTP ${otp}`
    }

    configOptions.sendMail(Mail);

    res.redirect(`/otpvalidate/${userData._id}`);

}

//otpvalidate

const otpvalidate = (req, res) => {

    const {id} = req.params;

    console.log("otpvalidate render");

    res.render('otpcheck',{id});

}

//resetpassword
const resetpassword = (req, res) => {

    const {id} = req.params;
    const {otp} = req.body;

     console.log("USer Otp",otp);

    if(MyOTP === otp){
        res.render('resetPass',{id});
    }
        else{
            res.redirect('/forgetpass');
        }

}

//resetpassUpdate

const resetpassUpdate = async(req,res) =>{

console.log("reset password");

const {id} = req.params;
console.log("USER ID : ", id);
const {new_pass,con_pass} = req.body;

const user = await userModel.findOne({_id:id})

if(user){
bcrypt.hash(new_pass,10, async(err,hash)=>{

    console.log("HASH PASSWORD : ", hash);


        const updateUser = await userModel.updateOne({_id:id}, {password:hash})
      console.log("updateUser",updateUser);

      res.redirect('/login');
      console.log("reset PAss compelet");

      
      
    });
}else{
    res.redirect('/forgetpass');
}
    

 

}

module.exports = { defaultController, signupController, loginController, postSignupController, PostLoginController, logoutController, addblogController, forgetpassController, changepasswordController, updatepasswordController, checkuser, otpvalidate ,resetpassword,resetpassUpdate};
