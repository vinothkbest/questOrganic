const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        action:{
            type: String,
            required: [true, 'Please provide the module name'],
        },
        module:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Module'
        }   

},{
    timestamps:true
})

module.exports = mongoose.model('Permission', permissionSchema)