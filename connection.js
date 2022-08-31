const mongoose = require('mongoose')
require('dotenv').config()

//db connection 
//mongoose.set('useNewUrlParser', true)
//mongoose.set('useUnifiedTopology', true)
//mongoose.set('useCreateIndex', true);
mongoose.connect(`${process.env.DB_HOST}/${process.env.DB_NAME}`).then((res)=>{
    console.log('DataBase Connected')
}).catch(err => {
    console.log(err)
});

module.exports = mongoose