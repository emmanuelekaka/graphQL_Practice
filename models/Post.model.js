const mongoose = require('mongoose')
// A schema takes in an object
const postSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    description: {
        type:String, 
    }
})
const Post = mongoose.model('post',postSchema)
module.exports = Post