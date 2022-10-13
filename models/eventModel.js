const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventTitle:{
        type: String,
        required: true
    },
    eventdate :{ 
        type: String,
        required: true
    },
    eventlocation :{ 
        type: String,
    },
    eventtime:{
        type: String,
        required: true, 
        trim: true
    },
    eventdescription: {
        type: String,
        maxlength: 4000
    },
    eventmetadescription: {
        type: String,
        maxlength: 4000
    },
    eventthumbnail:{
        data: Buffer,
        contentType : String
    }
},
{
    timestamps: true
}
)

const event = new mongoose.model("Event", eventSchema)
module.exports = event