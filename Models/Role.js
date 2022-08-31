const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name:{
            type: String,
            required: [true, 'Please provide the role'],
        },
        permissions:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Permission'
            }
        ]
},{
    timestamps:true
})

module.exports = mongoose.model('Role', roleSchema)