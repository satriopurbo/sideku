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
var {Op} = require('sequelize');


class Controller{


    static print(req,res){
        let c = req.query.b - req.query.a
        console.log(c)

        pasienModel.findAll({
            offset:req.query.a,
            limit: c,
         
            include:[
                {model:poolFotoWajah, required:false},
                // {model:poolPenyakit, where: {PenyakitId:  {
                //          [Op.ne]: null
                //     }}, required:false,include: {model: penyakit, paranoid:false}},

                //     {model:poolPernyataan,where: {pernyataanId:  {
                //         [Op.ne]: null
                //    }},
                //    required:false, include:{model:pernyataan, required:false}},

                //           {model:poolGejalaPsikis, where: {GejalaPsikiId:  {
                //         [Op.ne]: null
                //    }},required:false,include:{model: gejalaPsikis, paranoid:false}},

                    // {model:poolGejalaFisik,
                    //     where: {GejalaFisikId:  {
                    //         [Op.ne]: null
                    //    }},required:false, include:{model: gejalaFisik, paranoid:false}},

                    {model:poolGejalaPerilaku,
                        where: {GejalaPerilakuBurukId:  {
                            [Op.ne]: null
                       }},required:false, include:{model: gejalaPerilaku, paranoid:false}},

             

                   ]
        })
        .then(respon=>{
            // res.json(respon)
            // console.log(respon)
            res.render('print', {respon, a:req.query.a, b: req.query.b})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static count(req, res){
        pasienModel.count()
          .then(function(count) {
              res.json({jml: count})
          });
    }

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
        let data =[req.body]
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