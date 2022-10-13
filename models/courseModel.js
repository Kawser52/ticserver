const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    coursetitle:{
        type: String,
        required: true,
        trim: true
    },
    coursecat:{
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }, 

   courselevel: String,
   instructor: String,
   coursetime: String,
   courselession: String,
   offlinePrice: {
      type: Number,
      required: true
   },
   onlinePrice: {
     type:Number,
     required: true
     
   },
   enrollStudent: Number,
   coursetag:Array,
   coursedescription:{
    type: String,
   },
   cmetadescription:{
     type: String,
   },

   coursethumbnail:{
     data: Buffer,
     contentType: String
   }
},{
    timestamps: true
})

const course = new mongoose.model('Course', courseSchema)
module.exports = course