const router = require('express').Router()
const controller = require('../controller/usercontroller')


router.post('/login',controller.login)
router.get('/:id',controller.list)
router.post('/register', controller.register)
router.delete('/delete/:id',controller.delete)
router.patch('/:id',controller.update)


module.exports=router