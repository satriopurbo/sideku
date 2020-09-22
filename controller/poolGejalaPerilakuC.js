const poolGejalaPerilaku = require('../model/poolGejalaPerilakuM')
const Pasien = require('../model/pasienModel')
const gejalaPerilaku = require('../model/gejalaPerilakuBurukM')


class Controller{

    static register(req, res){
        const {status,pasienId,GejalaPerilakuBurukId}= req.body
         poolGejalaPerilaku.create({status:status,pasienId:pasienId,GejalaPerilakuBurukId:GejalaPerilakuBurukId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err.stack)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        poolGejalaPerilaku.findAll({
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
        poolGejalaPerilaku.findAll({
            sort:[['id','ASC']],
            include:[Pasien,gejalaPerilaku]
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
        
        poolGejalaPerilaku.update({
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
        poolGejalaPerilaku.destroy({
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