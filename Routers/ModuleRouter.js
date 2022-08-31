const router = require('express').Router()
const {index, store, edit, remove} = require('../Controllers/ModuleController')
const {filter} = require('../Middleware/AuthMiddleware')

router.get('/', filter,index)
router.post('/', filter,store)
router.put('/:id', filter,edit)
router.delete('/:id', filter,remove)

module.exports = router;