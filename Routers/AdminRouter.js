const router = require('express').Router()
const {roles,index,isUnique, store, edit, update,remove} = require('../Controllers/AdminController')
const {filter} = require('../Middleware/AuthMiddleware')
const upload = require('../Libraries/Storage')

router.get('/roles', filter, roles)
router.get('/', filter, index)
router.post('/unique', filter, isUnique)
router.post('/',upload.single('profile'), filter, store)
router.get('/:id', filter, edit)
router.put('/:id', upload.single('profile'), filter, update)
router.delete('/:id', filter, remove)

module.exports = router;