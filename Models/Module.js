const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name:{
            type: String,
            required: [true, 'Please provide the module name'],
        },
        icon_class:{
            type: String,
            required: [true, 'Please provide the icon class'],
        },
        slug:{
            type: String,
            required: true,
        },
        permissions:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Permission'
            }
        ]     

},{
    timestamps:true
})

module.exports = mongoose.model('Module', moduleSchema)