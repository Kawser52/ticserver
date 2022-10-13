const mongoose = require('mongoose')

const serviceShema= new mongoose.Schema({
    servicetitle:{
        type: String, 
        required: true,
        trim: true
    },
    servdescription:{
        type: String,
        required: true
    },
    sermetadescription:{
        type: String,
        maxlength: 2000
    },
    serviceicon:{
        data: Buffer,
        contentType : String
    }
},
{
    timestamps: true
})

const service = new mongoose.model("Service", serviceShema)
module.exports = service;