const router = require('express').Router()
const controller = require('../controller/pasienController')
const authentification = require('../Middleware/Authentification')

router.get('/details/:id',authentification,controller.details)
router.get('/all',authentification,controller.all)
router.get('/:id',authentification,controller.list)
router.post('/register', controller.register)
router.post('/login',controller.login)
router.post('/changePassword',authentification,controller.changePassword)
router.delete('/delete/:id',authentification,controller.delete)
router.patch('/:id',authentification,controller.update)
router.post('/screening',authentification,controller.screening)

module.exports=router