const router = require('express').Router()
const controller = require('../controller/gejalaFisikController')
const authentification = require('../Middleware/Authentification')

router.get('/:id',authentification,controller.list)
router.post('/register',authentification,controller.register)
router.delete('/delete/:id',authentification,controller.delete)
router.patch('/:id',authentification,controller.update)

module.exports=router