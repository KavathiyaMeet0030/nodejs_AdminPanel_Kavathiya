const mongoose = require('mongoose');

const subtopicschema = new mongoose.Schema({
    subtopicName : {
        type: String,
        required: true
    },
    topicName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topics',
        required:true
    }
})  


const subtopicmodel = mongoose.model('subtopics', subtopicschema);

module.exports = subtopicmodel;                                                                                                                                                                               

