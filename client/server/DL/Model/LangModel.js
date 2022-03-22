const mongoose = require('mongoose');

const schemaLang = new mongoose.Schema({
    icon: {
        type: String
    },
    prog_lang: {
        type: String,
        required: true,
        unique:true
    },
    tags: [String],
})

module.exports = mongoose.model('Lang',schemaLang)