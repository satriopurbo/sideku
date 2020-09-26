const poolFotoWajah = require('../model/poolFotoWajahModel')
const Pasien = require('../model/pasienModel')


class Controller{

    static register(req, res){
        const {namaFile,emosi,pasienId}= req.body
        poolFotoWajah.findAll({
            where:{
                namaFile:namaFile
            }
        }).then(data=>{
            if(data.length){
                res.json({message:'data sudah ada'})
            }
            else{
                poolFotoWajah.create({namaFile:namaFile,emosi:emosi,pasienId:pasienId}, {returning: true}).then(respon =>{
                    res.json(respon)
                 })
                 .catch(err=>{
                     res.json(err)
                 })
            }
        })
         
      }
    
    static list(req,res){
        const{id}=req.params
        poolFotoWajah.findAll({
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
    static findByPasien(req,res){
        const{id}=req.params
        poolFotoWajah.findAll({
            include:Pasien,
            where:{
                pasienId :id
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
    
        poolFotoWajah.findAll({
            sort:[['id','ASC']],
            include:Pasien
            
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
        const {namaFile,emosi}= req.body
        
        poolFotoWajah.update({
            namaFile:namaFile,
            emosi : emosi
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
        poolFotoWajah.destroy({
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