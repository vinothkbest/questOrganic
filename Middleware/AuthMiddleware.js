const jwt = require('jsonwebtoken')
require('dotenv').config()

const filter = (req, res, next) => {
    token = req.headers.authorization?req.headers.authorization.split(" ")[1]:""
   // console.log(token);
    if(!token){        
        return res.status(401).json({
            message:"Unauthorization",
            status:false
        })
    }
    const payload = jwt.verify(token, process.env.SECRET_TOKEN, { algorithm: 'HS256'});
    if(payload){
        return next();
    }
    return res.status(403).json({
        message:"Forbidden Access. Token invalid",
        status:false
    })
}

module.exports = {filter}