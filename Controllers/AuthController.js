const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Response = require('../Libraries/Response');
const Admin = require('../Models/Admin');
require('dotenv').config()

const login =  async(req,res) => {
    
        const admin = await Admin.findOne({username:req.body.username}).select('_id username password name profile role')
                    .populate({path: 'role',select: '_id name permissions', populate:{path:'permissions', select:'_id, module', populate:{path:'module'}}});
        if(!admin) return res.status(200).json({status:false, message: "Admin username invalid!"})
        
        const is_validPassword = await bcrypt.compare(req.body.password, admin.password);
        
            
        if(!is_validPassword) return res.status(200).json({status:false, message: "Admin password invalid!"})

        let adminData = [admin].map(admin =>{
            return {
                id: admin._id,
                name:admin.name,
                username:admin.username,
                profile:admin.profile,
                role:admin.role.name,
                permissions:admin.role.permissions
            }
        })
        
        const token = jwt.sign(adminData[0], process.env.SECRET_TOKEN, { algorithm: 'HS256'});
        admin.is_logged = true;
        adminData[0].token=token
        admin.save().then(admin => {
            return Response.success(res, 200, {admin : adminData[0], token}, "Admin Logged in Successfully")
        })
}

const deliverPayload = (req,res) => {
    const token = req.headers.authorization.split(" ")[1]
    const admin = jwt.verify(token, process.env.SECRET_TOKEN, { algorithm: 'HS256'});
    return Response.success(res, 200, {admin, token}, "Admin Logged in Successfully")
}

const logout = async (req,res) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.SECRET_TOKEN, { algorithm: 'HS256'});
    const admin  = await Admin.findById(user.id).exec();
    admin.is_logged = false;
    admin.token="";
    admin.save().then(admin => {
        return Response.success(res, 200, "" , "Admin Logged in Successfully")
  })

}
module.exports ={
    login,deliverPayload,logout
}