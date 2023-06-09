const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        
    },
    longUrl: {
        type: String,
        required: true,
        /*validate: {
            validator: function (value) {
                const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#]+\.[^\s]*$/;
                return urlRegex.test(value);
            },
            message: "Invalid URL format for longUrl"
        }*/
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

module.exports=mongoose.model('url',urlSchema);