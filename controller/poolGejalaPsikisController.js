const poolGejalaPsikis = require('../model/poolGejalaPsikis')
const pasien = require('../model/pasienModel')
const gejalaPsikis = require('../model/gejalaPsikisModel')




class Controller{

    static register(req, res){
        const {status,pasienId,GejalaPsikiId}= req.body
         poolGejalaPsikis.create({status:status,pasienId:pasienId,GejalaPsikiId:GejalaPsikiId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err.stack)
        })
      }
      static all(req,res){
        poolGejalaPsikis.findAll({
            order:[['id', 'ASC']],
            include:[gejalaPsikis,pasien]
            
            
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
        poolGejalaPsikis.findAll({
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
        
        poolGejalaPsikis.update({
            status:status
        },{
            where :{
                id:id
            }
        },{returning: true})
        .then(respon=>{
            res.json(`data dengan id ${respon} telah berhasil dirubah`)
        })
        .catch(err=>{
            res.json(err)
        })

    }

    static delete(req,res){
        const{id}= req.params
        poolGejalaPsikis.destroy({
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

}

module.exports=Controller