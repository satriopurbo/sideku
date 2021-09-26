const ODGJ = require('../model/ODGJModel')
const poolODGJ = require('../model/poolODGJModel')


class Controller{

    static register(req, res){
        const {pernyataanODGJ}= req.body
        ODGJ.findAll({
            where:{
                pernyataanODGJ:pernyataanODGJ
            }
        }).then(data=>{
            if(data.length){
                res.json({message:"data sudah ada"})
            }
            else{
                ODGJ.create({pernyataanODGJ:pernyataanODGJ}, {returning: true}).then(respon =>{
                    res.json(respon)
                 })
                 .catch(err=>{
                     res.json(err)
                 })
            }
        })
        
      }
    
    static detailsById(req,res){
        const{id}=req.params
        ODGJ.findAll({
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
        
        ODGJ.findAll({
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
        const {pernyataanODGJ}= req.body
        
        ODGJ.update({
            pernyataanODGJ:pernyataanODGJ
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
        ODGJ.destroy({
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
    static history(req,res){
        const{id}=req.params
        ODGJ.findAll(
        { 
            include:[{model:poolODGJ,
                required:false,
            where:{
                pasienId:id,
                
            }}]
            
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller