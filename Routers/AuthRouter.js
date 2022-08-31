const router = require('express').Router()
const {login,deliverPayload,logout} = require('../Controllers/AuthController')
const {filter} = require('../Middleware/AuthMiddleware')
router.post('/login', login);
router.get('/deliver-payload', filter, deliverPayload);
router.get('/logout', filter, logout);

module.exports = router;