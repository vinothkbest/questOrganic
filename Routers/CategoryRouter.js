const router = require('express').Router()
const {menuList,menu,index,isUnique, store, edit, update,remove} = require('../Controllers/CategoryController')
const {filter} = require('../Middleware/AuthMiddleware')
const upload = require('../Libraries/Storage')


router.get('/menus', menuList)
router.get('/menu/:slug', menu)


router.get('/', filter,index)
router.post('/unique', filter,isUnique)
router.post('/',upload.single('image'), filter,store)
router.get('/:id', filter,edit)
router.put('/:id', upload.single('image'), filter,update)
router.delete('/:id', filter,remove)

module.exports = router;