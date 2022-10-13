const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
        title:{
            type: String, 
            required: true,
            trim: true,
            unique: true
        },
        description: {
            type: String,
            maxlength: 2000
        }
},{
    timestamps:true
})

const category = new mongoose.model('Category', categorySchema)
module.exports = category;