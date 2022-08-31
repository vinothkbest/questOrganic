const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name:{
            type: String,
            required: [true, 'Please provide the category name'],
        },
        description:{
            type: String,
            required: [true, 'Please provide the description'],
        },
        image:{
            type: String,
            required: [true, 'Please upload the image'],
        },
        slug:{
            type: String
        }
},{
    timestamps:true
})

module.exports = mongoose.model('Category', categorySchema)