const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://kavathiyameet7603:Kavathiya%405757@cluster0.rmjjh.mongodb.net/AdminPanel')
    .then(() => console.log('Database Connected!')).catch((error) => {
        console.log("Error", error);
    })

