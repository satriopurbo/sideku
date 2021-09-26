const router = require('express').Router()
const controller = require('../controller/poolODGJController')
const authentification = require('../Middleware/Authentification')

router.post('/bulkODGJ',authentification,controller.bulkODGJ)
router.get('/all',authentification,controller.all)
router.get('/:id',authentification,controller.list)
router.post('/register',authentification,controller.register)
router.delete('/delete/:id',authentification,controller.delete)
router.post('/:id',authentification,controller.update)

module.exports=router