const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const AuthRouter = require('./Routers/AuthRouter')
const ModuleRouter = require('./Routers/ModuleRouter')
const RoleRouter = require('./Routers/RoleRouter')
const AdminRouter = require('./Routers/AdminRouter')
const OAuthRouter = require('./Routers/OAuthRouter')
const CategoryRouter = require('./Routers/CategoryRouter')
const QuestOrganic = express()
require('./connection')
require('dotenv').config()
require('./Libraries/OAuth')
//middleware
QuestOrganic.use(cors())
QuestOrganic.use(morgan('dev'))
//inbuilt body-parser
QuestOrganic.use(express.json());
QuestOrganic.use(express.urlencoded({ extended: true }));

//assets access
QuestOrganic.use('/public', express.static('public'))

//routers binding
QuestOrganic.use('/auth', AuthRouter)
QuestOrganic.use('/oauth2', OAuthRouter)
QuestOrganic.use('/modules', ModuleRouter)
QuestOrganic.use('/roles', RoleRouter)
QuestOrganic.use('/admins', AdminRouter)
QuestOrganic.use('/categories', CategoryRouter)

// port listen
QuestOrganic.listen(process.env.APP_PORT, function(){
    console.log(`Server is running on http://localhost:${process.env.APP_PORT}`)
})