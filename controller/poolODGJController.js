const poolODGJ = require('../model/poolODGJModel')
const pasien = require('../model/pasienModel')
const ODGJ = require('../model/ODGJModel')




class Controller{

    static bulkODGJ(req,res){
        
    }

    static register(req, res){
        const {status,pasienId,ODGJId}= req.body
         poolODGJ.create({status:status,pasienId:pasienId,ODGJId:ODGJId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err.stack)
        })
      }
      static all(req,res){
        poolODGJ.findAll({
            order:[['id', 'ASC']],
            include:[ODGJ,pasien]
            
            
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    
    static list(req,res){
        const{id}=req.params
        poolODGJ.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const {status}= req.body
        
        poolODGJ.update({
            status:status
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
        poolODGJ.destroy({
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