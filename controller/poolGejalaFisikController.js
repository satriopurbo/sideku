const poolGejalaFisik = require('../model/poolGejalaFisik')
const gejalaFisik = require('../model/gejalaFisikModel')
const Pasien = require('../model/pasienModel')



class Controller{

    static register(req, res){
        const {status,GejalaFisikId,pasienId}= req.body
         poolGejalaFisik.create({status:status,GejalaFisikId:GejalaFisikId,pasienId:pasienId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        poolGejalaFisik.findAll({
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
        
        poolGejalaFisik.findAll({
            sort:[['id','ASC']],
            include:[Pasien,gejalaFisik]
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
        const {status}= req.body
        
        poolGejalaFisik.update({
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
        poolGejalaFisik.destroy({
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