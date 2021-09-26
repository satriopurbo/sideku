const router = require('express').Router()
const controller = require('../controller/poolODGJController')
const authentification = require('../Middleware/Authentification')

router.post('/registerUpdate',authentification,controller.registerUpdate)
router.get('/listByPasienId',authentification,controller.listByPasienId)

module.exports=router