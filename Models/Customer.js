const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required: [true, 'Please provide the name']
    },
    email:{
        type: String,
        required: [true, 'Please provide the username'],
        unique:[true, 'This username is already taken']
    },
    profile:{
        type: String,
    },
    gender:{
        type: String
    },
    is_logged:{
        type: Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Customer', customerSchema)