const mongoose=require('mongoose');

const languageSchema=new mongoose.Schema({
    name:String
});

module.exports=mongoose.model('language',languageSchema,'languages');