const mongoose = require('mongoose')
const fs = require('fs')
const slugify = require('slugify')
const Category = require('../Models/Category')
const Response = require('../Libraries/Response')

const index = async (req, res) => {
    const limit = parseInt(req.query.limit)||5; 
    const offset = parseInt(req.query.skip)||0; 
    const term = req.query.search||''  
    const termQuery = [{
        name:{
            $regex:`.*${term}.*`
        }
    },
    {   description:{
            $regex:`.*${term}.*`
        }
    }];
    const count = await Category.find().or(termQuery).countDocuments();

    Category.find().or(termQuery).exec()
    .then(result => {
        return Response.success(res,200,{categories:result,totalRecords:count});
    })
    .catch(err =>{
        return Response.failure(res,500,err);
    })
}
const store = async (req, res) => {
    const  uri =  slugify(req.body.category, {
        replacement:'-',
        trim:true
    }).toLowerCase(); 
    new Category({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.category,
        description:req.body.description,
        slug:uri,
        image: req.file.path
    }).save()
    .then(category=>{
        return Response.success(res,201,category,"New Category Created");
    }).catch(err => {
        return Response.failure(res,401,err);
    })
    
}
const edit = (req, res) => {
    Category.findById(req.params.id).select('_id name description image').exec()
    .then(category=>{
        return Response.success(res,200,category);
    }).catch(err => {
        return Response.failure(res,500,err);
    })
}

const update = (req, res) => {
    const  uri =  slugify(req.body.category, {
        replacement:'-',
        trim:true
    }).toLowerCase(); 
    let data = {
        name:req.body.category,
        description:req.body.description,
        slug:uri
    };

    if(req.file) {
        Category.findById(req.params.id).select('image').exec().then((category) => {
            fs.unlinkSync(category.image)
        })
        data.image =  req.file.path
    }

    Category.findByIdAndUpdate(req.params.id, data).exec()
    .then(category=>{
        return Response.success(res,201,category,"Category Updated");
    }).catch(err => {
        return Response.failure(res,401,err);
    })
}

const isUnique =(req, res) => {
    const  uri =  slugify(req.body.category, {
        replacement:'-',
        trim:true
    }).toLowerCase(); 
    Category.find({
       slug:uri
    }).exec().then((category)=>{
        return Response.checker(res,category.length>0);
    });
}

const remove = (req, res) => {
    Category.findByIdAndRemove(req.params.id).exec().then((category) =>{
        fs.unlinkSync(category.image)
        return Response.success(res,201,category,"Category Removed!");
    }).catch((err) => {
        return Response.failure(res,401,err);
    })
}
/**
 * websites methods 
 */
const menuList = (req, res) => {
    console.log("Its Getting");
    Category.find().exec().then((categories) =>{
        return Response.success(res,200,categories);
    }).catch((err) => {
        return Response.failure(res,401,err);
    })
}

const menu = (req, res) => {
    Category.findOne({slug:req.params.slug}).select('_id name description image').exec()
    .then(category=>{
        return Response.success(res,200,category);
    }).catch(err => {
        return Response.failure(res,500,err);
    })
}

module.exports = {
    index,store,edit,update,isUnique,remove,menuList,menu
}
