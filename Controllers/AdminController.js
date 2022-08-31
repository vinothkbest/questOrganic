const mongoose = require('mongoose')
const sharp = require('sharp')
const fs = require('fs')
const bcrypt = require('bcrypt')
const Admin = require('../Models/Admin')
const Role = require('../Models/Role')
const roles = (req, res) => {
    Role.find().select('_id, name').exec().then(roles =>{
        return res.status(200).json({
            status: true,
            roles: roles
        })
    }).catch(err => {
        return res.status(500).json({
            status: false,
            erorrs: err
        }); 
    })
}

const index = async (req, res) => {
    const limit = parseInt(req.query.limit)||5; 
    const offset = parseInt(req.query.skip)||0; 
    const term = req.query.search||''  
    const termQuery = [{
        name:{
            $regex:`.*${term}.*`
        }
    },
    {   username:{
            $regex:`.*${term}.*`
        }
    }];
    const count = await Admin.find().or(termQuery).countDocuments();
    Admin.find().or(termQuery)
        .select('_id username name profile role')
        .populate({path: 'role',
                   select: '_id name'})
        .sort({_id:-1}).exec()
        .then(admins =>{
            return res.status(200).json({
                status: true,
                admins: admins,
                totalRecords:count
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: false,
                erorrs: err
            }); 
        })
}

const isUnique =(req, res) => {
    console.log(req.body.username)
   Admin.find({
       username:req.body.username
   }).exec().then((hasAdmin)=>{
        return res.status(200).json({
            status: hasAdmin.length>0
        }); 
   });
}

const store = (req, res) => {
    //image resize 
    sharp(req.file.path)
    .resize({ width: 200 })
    .toBuffer()
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    new Admin({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.admin,
        username:req.body.username,
        password:hashedPassword,
        role:req.body.role,
        profile: req.file.path
    }).save().then(admin =>{
        return res.status(201).json({
            status: true,
            message: "New Admin Created Successfully"
        });
    })
    .catch(err => {
        return res.status(500).json({
            status: false,
            erorrs: err
        }); 
    })
}
const edit = (req, res) => {
    Admin.findById(req.params.id).select('_id username name profile role')
    .populate({path: 'role',select: '_id name'}).exec()
    .then(admin => {
        return res.status(200).json({
            status: true,
            admin:admin
        });

    }).catch(err => {
        return res.status(500).json({
            status: false,
            erorrs: err
        }); 
    })
}

const update = (req, res) => {

    let data = {
        name:req.body.admin,
        username:req.body.username,
        role:req.body.role
    }
    if(req.body.password){
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        data.password = hashedPassword
    }
    
    if(req.file) {
        Admin.findById(req.params.id).select('profile').exec().then((admin) => {
            fs.unlinkSync(admin.profile)
        })
        data.profile =  req.file.path
    }

    Admin.findByIdAndUpdate(req.params.id, data).exec().then((admin) =>{
        return res.status(201).json({
            status: true,
            message: `Admin successfully updated`
        });
    }).catch((err) => {
        return res.status(500).json({
            status: true,
            message: err
        }); 
    })
}

const remove = (req, res) => {
    Admin.findById(req.params.id).select('profile').exec().then((admin) => {
        fs.unlinkSync(admin.profile)
    })
    Admin.findByIdAndRemove(req.params.id).exec().then((admin) =>{
        return res.status(201).json({
            status: true,
            message: `Admin successfully removed!`
        });
    }).catch((err) => {
        return res.status(500).json({
            status: true,
            message: err
        }); 
    })
}
const dowload = (req) =>{

}
module.exports = {
    roles,
    index,
    isUnique,
    store,
    edit,
    update,
    remove,
    dowload
}
