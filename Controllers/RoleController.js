const mongoose = require('mongoose')
const Role = require('../Models/Role')

const index = async (req, res) => {
    const limit = parseInt(req.query.limit)||5; 
    const offset = parseInt(req.query.skip)||0; 
    const term = req.query.search||''
    const termQuery = [{
        name:{
            $regex: `.*${term}.*`
        }
    }];
    var count = await Role.find().or(termQuery).countDocuments();
    Role.find().populate({path:'permissions',
                        select: '_id, action,module',
                        populate: {
                            path:'module',
                            select: '_id, name'
                        }}).or(termQuery).select('_id name permissions')
    .limit(limit).skip(offset)
    .exec().then((result)=>{
        res.status(200).json({
            roles:result,
            totalRecords:count
        })
    }).catch((err) => {
        res.status(500).json({
            message: err
        })
    })
}

const isUnique =(req, res) => {
   Role.find({
       name:req.body.name
   }).exec().then((hasRole)=>{
        return res.status(200).json({
            status: hasRole.length>0
        }); 
   });
}

const store = (req, res) => {
    new Role({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        permissions:req.body.permissions
    }).save().then((role) =>{
        return res.status(201).json({
            status: true,
            message: "New Role successfully added"
        });
    }).catch((err) => {
        return res.status(500).json({
            status: true,
            message: err
        }); 
    })
}
const edit = (req, res) => {
    const id = req.params.id
    Role.findById(id).populate({path:'permissions',
        select: '_id, action,module'}).select('_id name permissions')
        .then(result =>{
            return res.status(200).json({
                status:true,
                role:result
            })
        }).catch(err => {
            return res.status(500).json({
                status:false,
                errors:err
            })
        })
}

const update = (req, res) => {
    const DataObj = {
        name:req.body.name,
        permissions:req.body.permissions
    }
    Role.findByIdAndUpdate(req.params.id, {$set:DataObj}).exec().then((role) =>{
        return res.status(201).json({
            status: true,
            message: `${req.body.name} successfully updated`
        });
    }).catch((err) => {
        return res.status(500).json({
            status: true,
            message: err
        }); 
    })
}

const remove = (req, res) => {
   
}

module.exports = {
    index,isUnique,store,edit,update,remove
}
