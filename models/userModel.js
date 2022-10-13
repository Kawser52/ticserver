const mongoose = require('mongoose')
const crypto  = require('crypto')
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength:32
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 32
    },
    phone:{
        type: Number,
        trim: true
    }, 
    salt: String,
    hash_password:{
        type: String,
        required: true
        
    },
    role:{
        type:Number,
        default: 0
    }
},
{
    timestamps:true
})

userSchema.virtual('password')
.set(function(password){
    this._password= password
    this.salt = uuidv4()
    this.hash_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})
  
userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hash_password;  
    },
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto.createHmac('sha1', this.salt)
                            .update(password)
                            .digest('hex')
        } 
        catch (err){
            return "";
        }
    }
}

const userModels = mongoose.model('users', userSchema);
module.exports = userModels;