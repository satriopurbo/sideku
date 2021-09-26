const router = require('express').Router()
const controller = require('../controller/ODGJController')
const authentification = require('../Middleware/Authentification')

router.get('/all',authentification,controller.all)
router.get('/listById/:id',authentification,controller.detailsById)
router.post('/register',authentification,controller.register)
router.delete('/delete/:id',authentification,controller.delete)
router.patch('/update/:id',authentification,controller.update)
router.get('/history/:id',authentification,controller.history)

module.exports=router