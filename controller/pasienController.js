const pasienModel = require('../model/pasienModel')
const penyakit = require('../model/penyakitModel')
const poolPenyakit = require('../model/poolPenyakit')
const gejalaFisik = require('../model/gejalaFisikModel')
const poolGejalaFisik = require('../model/poolGejalaFisik')
const gejalaPerilaku = require('../model/gejalaPerilakuBurukM')
const poolGejalaPerilaku = require('../model/poolGejalaPerilakuM')
const poolFotoWajah = require('../model/poolFotoWajahModel')
const gejalaPsikis = require('../model/gejalaPsikisModel')
const poolGejalaPsikis = require('../model/poolGejalaPsikis')
const poolPernyataan = require('../model/poolPernyataanModel')
const pernyataan = require('../model/pernyataanModel')


class Controller{

    static register(req, res){
         pasienModel.create(req.body, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        pasienModel.findAll({
            where:{
                id :id
            }
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static details(req,res){
        const{id}=req.params
        pasienModel.findAll({
            where:{
                id :id
            },
            include:[{model:poolPenyakit,include:[penyakit]},
                    {model:poolFotoWajah},
                    {model:poolGejalaFisik,include:[gejalaFisik]},
                    {model:poolGejalaPerilaku,include:[gejalaPerilaku]},
                    {model:poolGejalaPsikis,include:[gejalaPsikis]},
                    {model:poolPernyataan,include:[pernyataan]}]
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static all(req,res){
    
        pasienModel.findAll({
            sort:[['id','ASC']]
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const {nama,umur,tempatLahir,alamat,pekerjaan}= req.body
        
        pasienModel.update({
            nama:nama,
            umur:umur,
            tempatLahir : tempatLahir, 
            alamat:alamat,
            pekerjaan:pekerjaan
        },{
            where :{
                id:id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })

    }

    static delete(req,res){
        const{id}= req.params
        pasienModel.destroy({
            where : {
                id: id
            }
        }).then(respon=>{
            res.json(`berhasil delete id : ${id}`)
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static screening(req,res){
        let data =[{pasienId: '5',
        namaFile: '1601124991162-Ir.Khoironi, MM.png',
        emosi: 'sedih',
        poolPenyakit:
         [ { penyakitId: 17,
             pasienId: '5',
             namaPenyakit: 'Penyakit Lainnya',
             lamaSakit: '1' },
           { penyakitId: 18,
             pasienId: '5',
             namaPenyakit: 'coba',
             lamaSakit: '2' },
           { penyakitId: 15,
             pasienId: '5',
             namaPenyakit: 'Gagal Ginjalllllll',
             lamaSakit: '3' },
           { penyakitId: 5,
             pasienId: '5',
             namaPenyakit: 'Penyakit Jantung Kronis',
             lamaSakit: 0 },
           { penyakitId: 14,
             pasienId: '5',
             namaPenyakit: 'Kolesterol',
             lamaSakit: 0 },
           { penyakitId: 7,
             pasienId: '5',
             namaPenyakit: 'Hipertensi',
             lamaSakit: 0 } ],
        poolGejalaFisik:
         [ { gejalaFisikId: 3,
             pasienId: '5',
             namaGejalaFisik: 'mlentung',
             status: '1' },
           { gejalaFisikId: 1,
             pasienId: '5',
             namaGejalaFisik: 'memar',
             status: '1' } ],
        poolGejalaPsikis:
         [ { gejalaPsikiId: 1,
             pasienId: '5',
             namaGejalaPsikis: 'stress',
             status: 0 },
           { gejalaPsikiId: 2,
             pasienId: '5',
             namaGejalaPsikis: 'emosinan',
             status: '1' },
           { gejalaPsikiId: 4,
             pasienId: '5',
             namaGejalaPsikis: 'Kemeng',
             status: '1' } ],
        poolGejalaPerilakuBuruk:
         [ { gejalaPerilakuBurukId: 2,
             pasienId: '5',
             namaGejalaPerilaku: 'hyperaktif',
             status: '1' },
           { gejalaPerilakuBurukId: 4,
             pasienId: '5',
             namaGejalaPerilaku: 'test4',
             status: 0 },
           { gejalaPerilakuBurukId: 1,
             pasienId: '5',
             namaGejalaPerilaku: 'mudah emosi',
             status: '1' } ],
        poolPernyataan:
         [ { pernyataanId: 1,
             pasienId: '5',
             isiPernyataan: 'saya sehat',
             status: '3' },
           { pernyataanId: 3,
             pasienId: '5',
             isiPernyataan: 'test5',
             status: 1 } ] }]

             //bulk
            poolFotoWajah.destroy({where:{
            pasienId:data[0].pasienId
        }})
        .then(hasil=>{
            poolPenyakit.destroy({where:{
                pasienId:data[0].pasienId
            }})
        })
        .then(hasil=>{
            poolGejalaFisik.destroy({where:{
                pasienId:data[0].pasienId
            }})
        })
        .then(hasil=>{
            poolGejalaPsikis.destroy({where:{
                pasienId:data[0].pasienId
            }})
        })
        .then(hasil=>{
            poolGejalaPerilaku.destroy({where:{
                pasienId:data[0].pasienId
            }})
        })
        .then(hasil=>{
            poolPernyataan.destroy({where:{
                pasienId:data[0].pasienId
            }})
        })
        .then(hasil=>{
            poolFotoWajah.bulkCreate(data,{returning:true})
        })
        .then(hasil=>{
            poolPenyakit.bulkCreate(data[0].poolPenyakit,{returning:true})
        })
        .then(hasil=>{
            poolGejalaFisik.bulkCreate(data[0].poolGejalaFisik,{returning:true})
        })
        .then(hasil=>{
            poolGejalaPsikis.bulkCreate(data[0].poolGejalaPsikis,{returning:true})
        })
        .then(hasil=>{
            poolGejalaPerilaku.bulkCreate(data[0].poolGejalaPerilakuBuruk,{returning:true})
        })
        .then(hasil=>{
            poolPernyataan.bulkCreate(data[0].poolPernyataan,{returning:true})
        })
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
        

        
        

    }

}

module.exports=Controller