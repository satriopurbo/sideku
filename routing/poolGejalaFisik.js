const router = require('express').Router()
const controller = require('../controller/poolGejalaFisikController')
const authentification = require('../Middleware/Authentification')

router.get('/all',authentification,controller.all)
router.get('/:id',authentification,controller.list)
router.post('/register',authentification,controller.register)
router.delete('/delete/:id',authentification,controller.delete)
router.patch('/:id',authentification,controller.update)

module.exports=router