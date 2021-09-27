const router = require('express').Router()
const controller = require('../controller/pernyataanController')
const authentification = require('../Middleware/Authentification')

router.get('/all',authentification,controller.all)
router.get('/:id',authentification,controller.list)
router.post('/register',authentification,controller.register)
router.delete('/delete/:id',authentification,controller.delete)
router.patch('/:id',authentification,controller.update)
router.get('/history/:id',authentification,controller.history)
router.get('/historyfront/:id',controller.history)
module.exports=router