const poolPernyataan = require('../model/poolPernyataanModel')



class Controller{

    static register(req, res){
        const {status,pasienId,PernyataanId}= req.body
         poolPernyataan.create({status:status,pasienId:pasienId,PernyataanId:PernyataanId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
        
      }
    
    static list(req,res){
        const{id}=req.params
        poolPernyataan.findAll({
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
        
        poolPernyataan.update({
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
        poolPernyataan.destroy({
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