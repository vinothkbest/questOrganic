const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name:{
            type: String,
            required: [true, 'Please provide the name']
        },
        username:{
            type: String,
            required: [true, 'Please provide the username'],
            unique:[true, 'This username is already taken']
        },
        password:{
            type:String
        },
        role:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        },
        profile:{
            type: String,
        },
        token:{
            type: String
        },
        is_logged:{
            type: Boolean,
            default:false
        }
})

module.exports = mongoose.model('Admin', adminSchema)