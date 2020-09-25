const poolPenyakit = require('../model/poolPenyakit')
const Pasien = require('../model/pasienModel')
const Penyakit = require('../model/penyakitModel')
const penyakit = require('../model/penyakitModel')


class Controller{

    static register(req, res){
        const {lamaSakit,pasienId,PenyakitId}= req.body
         poolPenyakit.create({lamaSakit:lamaSakit,pasienId:pasienId,PenyakitId:PenyakitId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        poolPenyakit.findAll({
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

    

    static all(req,res){
        
        poolPenyakit.findAll({
            sort:[['id','ASC']],
            include:[Pasien,Penyakit]
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
        const {lamaSakit}= req.body
        
        poolPenyakit.update({
            lamaSakit:lamaSakit
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
        poolPenyakit.destroy({
            where : {
                pasienId: id
            }
        }).then(respon=>{
            res.json(`berhasil delete id : ${id}`)
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller