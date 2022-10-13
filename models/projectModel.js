const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    projecttitle:{
        type:String,
        required: true,
    },
    projecturl:{
        type:String,
        required: true,
    },
    pdescription:{
        type: String,
        required: true
    },
    pmetadescription:{
        type: String,
        maxlength: 2000
    },
    pthumbnail:{
        data: Buffer,
        contentType: String
    }
},{
    timestamps: true
})

const project = new mongoose.model("Project", projectSchema)
module.exports = project