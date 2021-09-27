const router = require('express').Router()
const controller = require('../controller/pasienController')
const authentification = require('../Middleware/Authentification')

router.get('/details/:id',authentification,controller.details)
router.get('/all',authentification,controller.all)
router.get('/print',controller.print)
router.get('/count',controller.count)
router.get('/:id',authentification,controller.list)
router.post('/register', controller.register)
router.post('/login',controller.login)
router.post('/changePassword',authentification,controller.changePassword)
router.get('/front/:id',controller.list)
// router.post('/register',authentification, controller.register)
router.post('/registerfront', controller.register)
router.delete('/delete/:id',authentification,controller.delete)
router.patch('/:id',authentification,controller.update)
router.post('/screening',authentification,controller.screening)
router.post('/screeningfront',controller.screening)
module.exports=router