const router = require('express').Router()
const user = require('./user')
const pasien = require('./pasien')
const penyakit = require('./penyakit')
const poolPenyakit= require('./poolPenyakit')
const poolFotoWajah=require('./poolFotoWajah')
const gejalaFisik = require('./gejalaFisik')
const poolGejalaFisik=require('./poolGejalaFisik')
const gejalaPsikis = require('./gejalaPsikis')
const poolGejalaPsikis = require('./poolGejalaPsikis')
const gejalaPerilakuBuruk = require('./gejalaPerilakuBuruk')
const poolGejalaPerilaku= require('./poolgejalaPerilaku')
const pernyataan = require('./pernyataan')
const poolPernyataan = require('./poolPernyataan')
const poolODGJ = require('./poolODGJ')
const ODGJ = require('./ODGJ')


router.use('/user',user)
router.use('/pasien',pasien)
router.use('/penyakit',penyakit)
router.use('/poolPenyakit',poolPenyakit)
router.use('/poolFotoWajah',poolFotoWajah)
router.use('/gejalaFisik',gejalaFisik)
router.use('/poolGejalaFisik',poolGejalaFisik)
router.use('/gejalaPsikis',gejalaPsikis)
router.use('/poolGejalaPsikis',poolGejalaPsikis)
router.use('/gejalaPerilakuBuruk',gejalaPerilakuBuruk)
router.use('/poolGejalaPerilaku',poolGejalaPerilaku)
router.use('/pernyataan',pernyataan)
router.use('/poolPernyataan',poolPernyataan)
router.use('/poolODGJ',poolODGJ)
router.use('/ODGJ',ODGJ)

router.get('/', (req, res)=>{
    res.send('halaman home')
})
module.exports = router