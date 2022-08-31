const router = require('express').Router()
const {index,isUnique, store, edit, update,remove} = require('../Controllers/RoleController')
const {filter} = require('../Middleware/AuthMiddleware')
router.get('/', filter,index)
router.post('/unique', filter,isUnique)
router.post('/', filter,store)
router.get('/:id', filter,edit)
router.put('/:id', filter,update)
router.delete('/:id', filter,remove)

module.exports = router;