const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    blogTitle:{
        type: String,
        required: true
    },
    blogAuthor :{ 
        type: String,
        trim: true
    },
    blogTags:
        {
            type: Array
    },
    blogdescription: {
        type: String,
        maxlength: 4000
    },
    blogmetadescription: {
        type: String,
        maxlength: 2000
    },
    blogthumnail:{
        data: Buffer,
        contentType : String
    }
},
{
    timestamps: true
}
)

const blog = new mongoose.model("Blog", blogSchema)
module.exports = blog