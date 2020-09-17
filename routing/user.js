const router = require('express').Router()
const controller = require('../controller/usercontroller')
const authentification = require('../Middleware/Authentification')


router.post('/login',controller.login)
router.get('/:id',authentification,controller.list)
router.post('/register', controller.register)
router.delete('/delete/:id',controller.delete)
router.patch('/:id',controller.update)


module.exports=router