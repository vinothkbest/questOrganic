const mongoose = require('mongoose')
const slugify = require('slugify')
const Module = require('../Models/Module')
const Permission = require('../Models/Permission')

const index = (req, res) => {
   Module.find().populate('permissions', '_id, action').exec()
    .then(result => {
        res.status(200).json({
            modules:result
        })
    })
    .catch(err =>{
        res.status(500).json({
            message: err
        })
    })
}
const store = async (req, res) => {
    var moduleId ='';
    const  uri =  slugify(req.body.module, {
        replacement:'-',
        trim:true
    }).toLowerCase(); 
    new Module({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.module,
        slug:uri,
        icon_class:req.body.icon
    }).save()
    .then(async (module)=>{
        let save_permissions = []
        moduleId = module._id
        await req.body.actions.forEach(action => {
            const permissionObj = {
                _id:new mongoose.Types.ObjectId(),
                action:action,
                module: moduleId
            };
            save_permissions.push(permissionObj)           
        });

        Permission.insertMany(save_permissions)
        .then(async () => {
           const permissions =  await Permission.find({
                module:moduleId
            }).select('_id').exec();

            let updatePermissions=[];
            permissions.forEach(permission =>{
                updatePermissions.push(permission._id)
            })
            const result = await Module.findByIdAndUpdate(moduleId, {
                $set: {
                    permissions:updatePermissions
                }
            })
            if(result){
               return  res.status(201).json({
                message: 'New module and permissions successfully added',
                status: true
               })
            }
        })
    })
    
}
const edit = (req, res) => {
    
}

const remove = (req, res) => {
    
}

module.exports = {
    index,store,edit, remove
}
