const subtopicmodel = require('../models/subtopicmodel');
const topicModel = require('../models/topicModel')
const addtopic = async(req,res) =>{

     let newtopic = await topicModel.find();
     console.log("New Topic Database View",newtopic);

    console.log("ADD Topic Render");

    res.render('addtopic',{newtopic});


}

const addTopicsUser = async(req,res)=>{

    console.log("ADD Topic Render Post");
    let msg = req.body.topicName;

    console.log("Add topic ",msg,topicModel);

    
    try{
        let newData = await topicModel({
            topicName:msg
        })
        await newData.save();

        res.redirect('/');

    }catch(error){

        console.log("err",error);

    }


    let newtopicPost = await topicModel.find();
    console.log("New Topic Database View",newtopicPost);



}


//deleteTopic

const deleteTopic = async(req,res) =>{

    const {id} = req.params;

    const deleteTopic = await topicModel.findByIdAndDelete({_id:id})

    console.log("delete Topic",deleteTopic);

    res.redirect('/addtopic');

}


//addSubtopic

const addSubtopic = async(req,res) =>{


    console.log("Add Subtopic Render");

    const topic = await topicModel.find({})

    console.log("topic",topic);

    res.render('addSubTopic',{topic});

}

//addsubtopicuser

const addsubtopicuser = async(req,res) =>{
    console.log("Add Subtopic User Render");

    const {subtopicName,topicname} = req.body;

    const topic = await topicModel.findById(topicname);

    const subtopic = new subtopicmodel({
    subtopicName : subtopicName,
    topicName:topic._id
    })

    const newsubtopic = await subtopic.save();

    console.log("subtopic",newsubtopic);


     //pass subtopic other page

     const topicNames = await topicModel.find({});
     const subTopicsNames = await subtopicmodel.find({}).populate('topicName');

     console.log("topic new ",topicNames);
     console.log("sub new ",subTopicsNames);

     res.render('viewTopic',{topicNames,subTopicsNames});
    
}

//viewtopic

const viewTopic =async (req,res) =>{

    const topicNames = await topicModel.find({});
     const subTopicsNames = await subtopicmodel.find({}).populate('topicName');

     console.log("topic new ",topicNames);
     console.log("sub new ",subTopicsNames);


     res.render('viewTopic',{topicNames,subTopicsNames});
    

}
 
 module.exports = {addtopic,addTopicsUser,deleteTopic,addSubtopic,addsubtopicuser,viewTopic};