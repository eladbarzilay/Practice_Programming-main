const mongoose = require('mongoose');
// const { required } = require('nodemon/lib/config');

const schemaUser = new mongoose.Schema({
    userName: {
        type: String,
        required:true,
        minlength:2,
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    permit:{
        type:String,
        required: true,
        enum:['user','editor','admin'],
        default : 'user'
    },
    profilPicture:{
        type:String
    }
   
})

module.exports = mongoose.model('User',schemaUser)