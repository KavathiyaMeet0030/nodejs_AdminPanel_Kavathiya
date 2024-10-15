const mongoose = require('mongoose');

const topicschema = new mongoose.Schema({
    topicName : {
        type: String,
        required: true
    }
})  


const topicModel = mongoose.model('topics', topicschema);

module.exports = topicModel;                                                                                                                                                                               

