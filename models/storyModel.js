const mongoose = require('mongoose')

const ssSchema = new mongoose.Schema({
    sname:{
        type: String,
        required: true
    },
    sdesignation :{ 
        type: String,
        trim: true
    },
   
    sdescription: {
        type: String,
        maxlength: 4000
    },
 
    spicture:{
        data: Buffer,
        contentType : String
    }
},
{
    timestamps: true
}
)

const sStory = new mongoose.model("Sstory", ssSchema)
module.exports = sStory