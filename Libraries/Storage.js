const uuid = require('uuid')
const multer = require('multer')
//image storage
const storage = multer.diskStorage({
    destination: function (req, file, callback){
       // console.log(req.body)
        callback(null, `public/${req.body.folder}`)    
    },
    filename: function (req, file, callback){
        const extension = file.originalname.split('.')[1]
        let filename = `${uuid.v4()}.${extension}`
        callback(null, filename)
    }
})
//validate image 
const fileFilter = function(req, file, callback){
    const memetypes =['image/jpeg', 'image/jpg', 'image/png']
    if(memetypes.indexOf(file.mimetype) == -1){
        
        callback(null, false)
    }
    else{
        callback(null, true)
    }
}
//upload config
const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1024 * 1024 // maximum 1MB
    },
    fileFilter: fileFilter
}) 

module.exports = upload; 