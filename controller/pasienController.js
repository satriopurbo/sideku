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
const poolODGJ= require('../model/poolODGJModel')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')
var {Op} = require('sequelize');
const sq = require('../connection')
// async function isiUsername(){
//     let encryptedPassword = bcrypt.hashPassword('fosan')
//     for(let i=0;i<2660;i++){
//         pasienModel.findAll({where:{
//             id:i
//         }})
//         .then(hasil=>{
//             if(hasil.length){
//                 pasienModel.update({
//                     username:`side${i}`,
//                     password:encryptedPassword
//                 },{
//                     where:{
//                         id:i
//                     }
//                 })
//             }
//         })
//         .catch(err=>{
//            console.log(err)
//         })
//     }
// }
// isiUsername()


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

    static async register(req, res){
        const {username,password,nama,tanggalLahir,tempatLahir,alamat,pekerjaan,pendidikanPasien,lamaPerawatan,penanggungJawabPasien}=req.body
        let encryptedPassword=""
        let max = await sq.query(`select max(id) from pasiens`)
      
        let username2 = ""
       if(password){
        encryptedPassword = bcrypt.hashPassword(password)
        }
        else{
        encryptedPassword = bcrypt.hashPassword('fosan')  
        }
        if(username){
            username2=username
        }
        else{
            username2 = `${max[0][0]["max"]+1}`
        }

    
        pasienModel.findAll({where:{
            username:username2
        }})
        .then(hasil=>{
            
           if(hasil.length){
               res.json({message:"username sudah terdaftar"})
           }
           else{
               pasienModel.create({username:username2,password:encryptedPassword,nama,tanggalLahir,tempatLahir,alamat,pekerjaan,pendidikanPasien,lamaPerawatan,penanggungJawabPasien})
               .then(hasil2=>{
                poolODGJ.create({pasienId:hasil2.dataValues.id})
                .then(hasil3=>{
                    res.json({message:"sukses",pasienId:hasil2.dataValues.id})
                })
               })
           }
        })
      }

      static login(req,res){
        const{username,password}= req.body

        pasienModel.findAll({
            where:{
                username:username
            }
        })
        .then(data=>{
            if(data.length){
            
        let hasil =  bcrypt.compare(password, data[0].dataValues.password);
                if(hasil){
                    res.json({token : jwt.generateToken(data[0].dataValues),id:data[0].id})
                }
                else{
                    res.json({message : "password salah"})
                }
            }
            else{res.json({message :"username tidak terdaftar"})}
        })
        .catch(err=>{
            res.json({message : err})
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
        const {nama,tanggalLahir,tempatLahir,alamat,pekerjaan,pendidikanPasien,lamaPerawatan,penanggungJawabPasien}= req.body
        
        pasienModel.update({
            nama,tanggalLahir,tempatLahir,alamat,pekerjaan,pendidikanPasien,lamaPerawatan,penanggungJawabPasien
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

    static changePassword(req, res) {
        const { passwordLama, passwordBaru } = req.body;
        pasienModel
          .findAll({
            where: {
              id: req.dataUsers.id,
            },
          })
          .then((data) => {
            let hasil = bcrypt.compare(passwordLama, data[0].dataValues.password);
            if (hasil) {
              let encryptedPassword = bcrypt.hashPassword(passwordBaru);
              pasienModel
                .update({ password: encryptedPassword },
                  {
                    where: {
                      id: req.dataUsers.id,
                    },
                  }
                )
                .then((data2) => {
                    res.status(200).json({ status: 200, message: "password berhasil di rubah"})
                });
            } else {
                res.status(200).json({ status: 200, message: "password salah"})
            }
          })
          .catch((err) => {
            res.status(500).json({ status: 500, message: "gagal", data: err})
          });
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